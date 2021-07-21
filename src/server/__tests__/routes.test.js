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
  test("It should response the GET method", () => {
    return request(app)
      .get("/order/total")
      .then(response => {
        expect(response.statusCode).toBe(200); 
        console.log(response.body);
        expect(response.body).toStrictEqual({"result" : 5000});
      });
  });
});

describe("Test number of vaccination sone", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/vaccination/total")
      .then(response => {
        expect(response.statusCode).toBe(200); 
        expect(response.body).toStrictEqual({"result" : 7000});
      });
  });
});

