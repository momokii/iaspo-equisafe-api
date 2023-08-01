// *! -------------------- TEMPLATE
// /**
//  * @swagger
//  * /:
//  *   post:
//  *     summary: a
//  *     tags: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *
//  *     responses:
//  *       '':
//  *         description:
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 errors:
//  *                   example:
//  *                 message:
//  *                   example:
//  *       '500':
//  *         description: Internal Server Error
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 errors:
//  *                   example: true
//  *                 message:
//  *                   type: string
//  *
//  *
//  */



// * -------------------- article documentation
//*! /articles
/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get article data
 *     tags: [Article]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: page number
 *       - name: per_page
 *         in: query
 *         description: how much document on 1 page, default set to 5
 *       - name: search
 *         in: query
 *         description: search feature based on searching by title name
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: Get article data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get Article Data
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_data:
 *                       type: number
 *                     current_page:
 *                       type: number
 *                     per_page:
 *                       type: number
 *                     articles:
 *                       type: array
 *                       items:
 *                         properties:
 *                           _id:
 *                             type: string
 *                           title:
 *                             type: string
 *                           author:
 *                             type: string
 *                           source:
 *                             type: string
 *                           pic:
 *                             type: string
 *                           content:
 *                             type: string
 *
 *       '401':
 *         description: Token not valid / Account doesnt have access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *
 *
 */





//*! /articles/:id_articles
/**
 * @swagger
 * /articles/{id_article}:
 *   get:
 *     summary: Get one article data
 *     tags: [Article]
 *     parameters:
 *       - name: id_article
 *         in: path
 *         required: true
 *         description: article id need to search
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: Get Article Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get Article Data
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     author:
 *                       type: string
 *                     source:
 *                       type: string
 *                     pic:
 *                       type: string
 *                     content:
 *                       type: string
 *
 *       '401':
 *         description: Token not valid / Account doesnt have access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *
 *       '404':
 *         description: Article data not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *
 *
 */