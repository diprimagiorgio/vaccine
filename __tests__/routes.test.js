const request = require("supertest");
const app = require("../app");

describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});
describe("Test total number of orders", () => {
  test("It should response the GET method with result 5000", () => {
    return request(app)
      .get("/order/total")
      .then(response => {
        expect(response.statusCode).toBe(200); 
        console.log(response.body);
        expect(response.body).toStrictEqual({"result" : 5000});
      });
  });
});

describe("Test number of vaccination done", () => {
  test("It should response the GET method with result 7000", () => {
    return request(app)
      .get("/vaccination/total")
      .then(response => {
        expect(response.statusCode).toBe(200); 
        expect(response.body).toStrictEqual({"result" : 7000});
      });
  });
});

describe("When counted from 2021-04-12T11:10:06.473587Z number of vaccines expired before usage",() => {
  test("It should response the GET method with result 12590", () => {
    return request(app)
      .get("/dose/expired?date=2021-04-12T11:10:06.473587Z")
      .then(response => {
        expect(response.statusCode).toBe(200); 
        expect(response.body).toStrictEqual({"result" : 12590});
      });
  });
});

describe("When counted from 2021-04-12T11:10:06.473587Z number of expired bottles",() => {
  test("It should response the GET methodwith result 12590", () => {
    return request(app)
      .get("/order/expired?date=2021-04-12T11:10:06.473587Z")
      .then(response => {
        expect(response.statusCode).toBe(200); 
        expect(response.body).toStrictEqual({"result" : 3482});
      });
  });
});