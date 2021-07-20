'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      orderNumber: { 
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false
      },
      responsiblePerson: {
        type: Sequelize.STRING
      },
      injections: {
        type: Sequelize.INTEGER
      },
      arrived: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW // ?? OR DATE TIME
      },
      vaccine: {
        type: Sequelize.ENUM('Zerpfy','Antiqua','SolarBuddhica')
      },
      healthCareDistrict: {
        type: Sequelize.ENUM('HYKS','KYS','OYS','TAYS','TYKS')
      },
      injections_left: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false

      }
    }).then(() => queryInterface.addConstraint('Orders', {
        fields: ['injections_left'],
        type: 'check',
        where: {
          injections_left: {
                [Sequelize.Op.gte]: 0
            }
        }
    }));

    await queryInterface.createTable('Vaccinations', {
      vaccination_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      gender: { 
        type: Sequelize.ENUM('male','female','nonbinary'),
      },
      sourceBottle: {
        type: Sequelize.STRING,
        allowNull: false,
        references:{
          model: "Orders",
          key: "id"
        }
      },
      vaccinationDate: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      }
    });

    await queryInterface.createFunction(
      'update_injections_left_func',
      [],
      'trigger',
      'plpgsql',
      `
      BEGIN
      UPDATE "Orders" SET injections_left = injections_left - 1 WHERE "Orders".id = NEW."sourceBottle";   
      RETURN NEW; 
      END;
      `,
      [
        'NOT LEAKPROOF'
      ],
      {
        force: true
      }
      
    ).then(
      () => queryInterface.sequelize.query(`
      CREATE TRIGGER update_injections_left
        AFTER INSERT
        ON public."Vaccinations"
        FOR EACH ROW
        EXECUTE FUNCTION public.update_injections_left_func();
      `)
    );
  
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropAllTables();
    await queryInterface.dropFunction("update_injections_left_func",[]);
  }
};
//TODO The default value should be the save of the doses