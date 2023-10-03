//*! /template
/**
 * @swagger
 * /templates:
 *   get:
 *     summary: Get template data
 *     tags: [Thumbnail Template]
 *     parameters:
 *       - name: search
 *         in: query
 *         description: search feature based on searching by title name
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: Get template data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get Template Data
 *                 data:
 *                   type: array
 *                   items: 
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       tipe:
 *                         type: string
 *                       link:
 *                         type: string  
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





//*! /template/{id_template}
/**
 * @swagger
 * /templates/{id_template}:
 *   get:
 *     summary: Get one template data
 *     tags: [Thumbnail Template]
 *     parameters:
 *       - name: id_template
 *         in: path
 *         description: id_template need to search
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: Get one template data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get Template Data
 *                 data:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       tipe:
 *                         type: string
 *                       link:
 *                         type: string  
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
 *         description: Data not found
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





//*! /template
/**
 * @swagger
 * /templates:
 *   patch:
 *     summary: Edit / change template picture - admin exclusive
 *     tags: [Thumbnail Template]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content: 
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id_template:
 *                 type: string
 *               file:
 *                 type: file  
 *
 *     responses:
 *       '200':
 *         description: Get one template data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success edit template data 
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
 *         description: Data not found
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