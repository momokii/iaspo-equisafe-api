// * -------------------- video documentation
//*! /videos
/**
 * @swagger
 * /videos:
 *   get:
 *     summary: Get video data
 *     tags: [Video]
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
 *         description: Get video data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get Video Data
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
 *                           description:
 *                             type: string
 *                           link:
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





//*! /videos/:id_video
/**
 * @swagger
 * /videos/{id_video}:
 *   get:
 *     summary: Get one video data
 *     tags: [Video]
 *     parameters:
 *       - name: id_video
 *         in: path
 *         required: true
 *         description: video id need to search
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: Get Video Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get Video Data
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     link:
 *                       type: string
 *
 *       '404':
 *         description: Video data not found
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





//*! /videos
/**
 * @swagger
 * /videos:
 *   post:
 *     summary: Post new video data
 *     tags: [Video]
 *     security:
 *       - bearerAuth: []
 *     requestBody: 
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               file:
 *                 type: file
 *
 *
 *     responses:
 *       '200':
 *         description: Post new video data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Sukses tambah video
 *
 *       '400':
 *         description: Process Post new video error
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





//*! /videos/{id_video}/recent
/**
 * @swagger
 * /videos/{id_video}/recent:
 *   patch:
 *     summary: Update user last played video data
 *     tags: [Video]
 *     parameters:
 *       - name: id_video
 *         in: path
 *         required: true
 *         description: id video need to post to be user last played video
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: Update user last video played info data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Update user recent video played
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
 *         description: Video data not found
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





//*! /videos/{id_video}
/**
 * @swagger
 * /videos/{id_video}:
 *   patch:
 *     summary: Edit video data
 *     tags: [Video]
 *     parameters:
 *       - name: id_video
 *         in: path
 *         required: true
 *         description: id video need to edit
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               file:
 *                 type: file
 *
 *     responses:
 *       '200':
 *         description: Edit video data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Sukses edit video data
 *
 *       '400':
 *         description: Process Update new video error
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
 *         description: Video data not found
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





//*! /videos/{id_video}
/**
 * @swagger
 * /videos/{id_video}:
 *   delete:
 *     summary: delete video data
 *     tags: [Video]
 *     parameters:
 *       - name: id_video
 *         in: path
 *         required: true
 *         description: id video need to delete
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: Delete video data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Sukses delete video data
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
 *         description: Video data not found
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