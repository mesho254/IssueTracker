const express = require("express");
const router = express.Router();
const {
  getIssues,
  createIssue,
  updateIssue,
  deleteIssue,
} = require("../Controllers/issueController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Issue:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the issue
 *         title:
 *           type: string
 *           description: The title of the issue
 *         description:
 *           type: string
 *           description: The description of the issue
 *       example:
 *         id: 1
 *         title: Issue 1
 *         description: Description of Issue 1
 */

/**
 * @swagger
 * /issues:
 *   get:
 *     summary: Returns the list of all issues
 *     tags: [Issues]
 *     responses:
 *       200:
 *         description: The list of issues
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Issue'
 */
router.get("/issues", getIssues);

/**
 * @swagger
 * /issues:
 *   post:
 *     summary: Create a new issue
 *     tags: [Issues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Issue'
 *     responses:
 *       201:
 *         description: The issue was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Issue'
 */
router.post("/issues", createIssue);

/**
 * @swagger
 * /issues/{id}:
 *   put:
 *     summary: Update an issue
 *     tags: [Issues]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The issue id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Issue'
 *     responses:
 *       200:
 *         description: The issue was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Issue'
 *       404:
 *         description: The issue was not found
 */
router.put("/issues/:id", updateIssue);

/**
 * @swagger
 * /issues/{id}:
 *   delete:
 *     summary: Delete an issue
 *     tags: [Issues]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The issue id
 *     responses:
 *       200:
 *         description: The issue was deleted
 *       404:
 *         description: The issue was not found
 */
router.delete("/issues/:id", deleteIssue);

module.exports = router;
