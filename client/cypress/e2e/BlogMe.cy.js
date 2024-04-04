describe("BloeMe load properly", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    // cy.visit("https://blogme-7f01a.web.app/");
  });
  //   it("passes", () => {
  //     cy.visit("http://localhost:5173/");
  //   });

  it("loads basic interface", () => {
    const login = cy
      .get(
        "#root > div > div > div > div.navbar > div > div.links > a:nth-child(8)"
      )
      .should("have.text", "Login");

    cy.get("#root > div > div > div > div.home > div").should("exist");

    cy.get("#root > div > div > div > footer").should("exist");
    // footer.get("span").should("have.text", "Made with Yang and");
  });

  it("login", () => {
    cy.get(
      "#root > div > div > div > div.navbar > div > div.links > a:nth-child(8)"
    ).click();
    const login = {
      username: "1234",
      password: "1234",
    };
    cy.login(login.username, login.password);
  });
});

describe("Test CRUD Posts", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    // cy.visit("https://blogme-7f01a.web.app/");
    cy.get(
      "#root > div > div > div > div.navbar > div > div.links > a:nth-child(8)"
    ).click();
    const user = {
      username: "123",
      password: "123",
    };
    cy.login(user.username, user.password);
  });

  const post = {
    title: "Hello World",
    content: "I will use React and Cypress",
  };

  it("add a post", () => {
    cy.get(
      "#root > div > div > div > div.navbar > div > div.links > a:nth-child(9) > span"
    ).click();

    cy.get(`#root > div > div > div > div.add > div.content > input[type=text]`)
      .clear()
      .type(post.title);
    cy.get(
      `#root > div > div > div > div.add > div.content > div > div > div.ql-container.ql-snow > div.ql-editor.ql-blank`
    )
      .clear()
      .type(post.content);
    cy.get("#art").click();

    cy.get(
      "#root > div > div > div > div.add > div.menu > div:nth-child(1) > div > button:nth-child(2)"
    ).click();

    cy.get(
      "#root > div > div > div > div.home > div > div:nth-child(1) > div.content > a:nth-child(1) > h1"
    )
      .first()
      .should("have.text", post.title);

    cy.get(
      "#root > div > div > div > div.home > div > div:nth-child(1) > div.content > p"
    )
      .first()
      .should("have.text", post.content);
    cy.wait(1000);
  });

  const updatedPost = {
    title: " Edited",
    content: " Edited",
  };

  it("edit a post", () => {
    cy.get(
      "#root > div > div > div > div.home > div > div:nth-child(1) > div.content > a:nth-child(1) > h1"
    )
      .first()
      .click();

    cy.get(
      "#root > div > div > div > div.single > div.content > div > div.edit > a"
    ).click();

    cy.get(
      "#root > div > div > div > div.add > div.content > input[type=text]"
    ).type(updatedPost.title);

    cy.get(
      "#root > div > div > div > div.add > div.content > div > div > div.ql-container.ql-snow > div.ql-editor"
    ).type(updatedPost.content);

    cy.get(
      "#root > div > div > div > div.add > div.menu > div:nth-child(1) > div > button:nth-child(2)"
    ).click();

    cy.get(
      "#root > div > div > div > div.home > div > div:nth-child(1) > div.content > a:nth-child(1) > h1"
    )
      .first()
      .should("have.text", post.title + updatedPost.title);

    cy.get(
      "#root > div > div > div > div.home > div > div:nth-child(1) > div.content > p"
    )
      .first()
      .should("have.text", post.content + updatedPost.content);
    cy.wait(1000);
  });

  it("delete a post", () => {
    cy.get(
      "#root > div > div > div > div.home > div > div:nth-child(1) > div.content > a:nth-child(1) > h1"
    )
      .first()
      .click();

    cy.get(
      "#root > div > div > div > div.single > div.content > div > div.edit > img"
    ).click();

    cy.get(
      "#root > div > div > div > div.home > div > div:nth-child(1) > div.content > a:nth-child(1) > h1"
    ).should("not.equal", post.title + updatedPost.title);
    cy.wait(1000);
  });

  it("logout", () => {
    cy.get(
      "#root > div > div > div > div.navbar > div > div.links > span:nth-child(8)"
    ).click();
    cy.get(
      "#root > div > div > div > div.navbar > div > div.links > a:nth-child(8)"
    ).should("have.text", "Login");
  });
});

Cypress.Commands.add("login", (username, password) => {
  cy.get("#root > div > div > div > form > input[type=text]:nth-child(1)")
    .clear()
    .type(username);
  cy.get("#root > div > div > div > form > input[type=password]:nth-child(2)")
    .clear()
    .type(password);

  cy.get("#root > div > div > div > form > button").click();

  cy.get(
    "#root > div > div > div > div.navbar > div > div.links > span:nth-child(8)"
  ).should("have.text", "Logout");
});
