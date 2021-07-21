import {baseUrl} from './shared/baseUrl';
import Axios from "axios";

export const getTotalDoses = () => {
    Axios.get(baseUrl + "totalDoses/")
    .then((response) => {
      const json = '{"result":true, "count":42}';
      //const obj = JSON.parse(response.data);
      console.log("aba - " + response.data.result);
      return 2;
    })
    .catch((err) => {
      console.log(err);
      return -1;
    });
};
export const getTotalOrders = () => {
    Axios.get(baseUrl + "totalOrders/")
    .then((response) => {
      console.log("1 - " + response.data);
      console.log("1b - " + typeof response.data);
      console.log("2 - " + response);
      
      const obj = JSON.parse(response.data.toString());
      console.log("3 - " + obj.result);
      console.log("totalOrders "  );
      return response.data;
      
    })
    .catch((err) => {
      console.log(err);
      return -1;
      
    });
}