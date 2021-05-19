/**********************************************
 * Bug Router
 * ==================================
 * Connect routes to service class
 *
 * /api/bugs - GET
 * /api/bugs/:bugId - GET
 * /api/bugs - POST
 * /api/bugs/:id - EDIT
 * /api/bugs/:id - DELETE
 ***********************************************/

const express = require("express");
class BugRouter {
  constructor(bugService) {
    this.bugService = bugService;
  }
  router() {
    const router = express.Router();
    router.get("/api/bugs", this.getAll.bind(this));

    router.get("/api/bugs/:id", this.get.bind(this));
    router.get(
      "/api/users/:userId/bugs",
      this.getUserBugs.bind(this)
    );
    router.post("/api/bugs", this.post.bind(this));
    router.put("/api/bugs/:id", this.put.bind(this));
    router.delete("/api/bugs/:id", this.delete.bind(this));
    return router;
  }
  getAll(request, response) {
    this.bugService.getAll().then((allBugs) => {
      response.json(allBugs);
    });
  }
  get(request, response) {
    let id = request.params.id;
    this.bugService.get(id).then((bug) => {
      response.send(bug);
    });
  }
  getUserBugs(request, response) {
    let userId = request.params.userId;
    this.bugService.getUsersBugs(userId).then((bugs) => {
      response.json(bugs);
    });
  }
  post(request, response) {
    let bug = request.body;
    // also grab the latest id and append it to the body
    // grab the length of my current table, grab that id, and then append it to the body
    this.bugService.add(bug).then(() => {
      response.send("inserted");
    });
  }
  put(request, response) {
    console.log("hitting put route");

    let newBug = request.body;
    let id = request.params.id;
    console.log("New bug", newBug, "id", id);
    this.bugService.edit(id, newBug).then(() => {
      response.send("edited");
    });
  }
  delete(request, response) {
    let id = request.params.id;
    this.bugService.delete(id).then(() => {
      response.send("deleted");
    });
  }
}
module.exports = BugRouter;
