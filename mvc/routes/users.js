const express = require("express");
const router = express.Router();
const middleware = require("./middleware/middleware");

const usersCtrl = require("../controllers/users");
const fakeUsersCtrl = require("../controllers/fake-users");

// Logging & Registro
router.post("/register", usersCtrl.registerUser);
router.post("/login", usersCtrl.loginUser);

// Requests
router.get("/generate-feed", middleware.authorize, usersCtrl.generateFeed);
router.get(
  "/get-user-data/:userid",
  middleware.authorize,
  usersCtrl.getUserData
);
router.get(
  "/get-search-results",
  middleware.authorize,
  usersCtrl.getSearchResults
);

// Manejo de peticiones de amistad
router.get(
  "/get-friend-requests",
  middleware.authorize,
  usersCtrl.getFriendRequests
);
router.post(
  "/make-friend-request/:from/:to",
  middleware.authorize,
  usersCtrl.makeFriendRequest
);
router.post(
  "/resolve-friend-request/:from/:to",
  middleware.authorize,
  usersCtrl.resolveFriendRequest
);

// Manejo de posts
router.post("/create-post", middleware.authorize, usersCtrl.createPost);
router.post(
  "/like-unlike/:ownerid/:postid",
  middleware.authorize,
  usersCtrl.likeUnlike
);
router.post(
  "/post-comment/:ownerid/:postid",
  middleware.authorize,
  usersCtrl.postCommentOnPost
);

// Manejo de mensajes
router.post("/send-message/:to", middleware.authorize, usersCtrl.sendMessage);
router.post(
  "/delete-message/:messageid",
  middleware.authorize,
  usersCtrl.deleteMessage
);
router.post(
  "/reset-message-notifications",
  middleware.authorize,
  usersCtrl.resetMessageNotifications
);

// Misc.
router.post(
  "/bestie-enemy-toggle/:userid",
  middleware.authorize,
  usersCtrl.bestieEnemyToggle
);
router.post(
  "/reset-alert-notifications",
  middleware.authorize,
  usersCtrl.resetAlertNotifications
);

// ===============================
// Testeo!
router.delete("/all", usersCtrl.deleteAllUsers);
router.get("/all", usersCtrl.getAllUsers);

router.post("/create-fake-users", fakeUsersCtrl.createFakeUsers);

module.exports = router;
