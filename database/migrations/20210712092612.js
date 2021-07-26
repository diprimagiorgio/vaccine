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
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      vaccine: {
        type: Sequelize.ENUM('Zerpfy','Antiqua','SolarBuddhica')
      },
      healthCareDistrict: {
        type: Sequelize.ENUM('HYKS','KYS','OYS','TAYS','TYKS')
      },
      injections_used: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false

      }
    }).then(() => 
      queryInterface.addConstraint('Orders', {
        fields: ['injections_used'],
        type: 'check',
        where: {
        injections_used:{
          [Sequelize.Op.lte] : { [Sequelize.Op.col]: 'Orders.injections' }
        }
        }
      })
    );
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
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    //TODO this one should be a transaction because we have to block injection used in between the select and the update
    await queryInterface.createFunction('update_injections_used_func',
      [],
      'trigger',
      'plpgsql',
      `
      BEGIN
      UPDATE "Orders" SET injections_used = injections_used + 1 WHERE "Orders".id = NEW."sourceBottle";   
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
      CREATE TRIGGER update_injections_used
        AFTER INSERT
        ON public."Vaccinations"
        FOR EACH ROW
        EXECUTE FUNCTION public.update_injections_used_func();
      `)
    );
  
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropAllTables();
    queryInterface.dropFunction("update_injections_used_func",[]).then( () => console.log("Removed the function update_injections_used_func" ))
    .catch((err) => console.log(err))
  }
};