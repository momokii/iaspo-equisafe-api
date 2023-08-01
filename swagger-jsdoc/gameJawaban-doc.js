//*! /games/jawaban/play
/**
 * @swagger
 * /games/jawaban/play:
 *   get:
 *     summary: Play Game, get question - Jawaban Singkat
 *     tags: [Game - Jawaban Singkat]
 *     parameters:
 *       - name: number_question
 *         in: query
 *         description: how much question need to get
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: Play Game - Jawaban Singkat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Play Game - Jawaban Singkat
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_data:
 *                       type: number
 *                     total_question:
 *                       type: number
 *                     questions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           question:
 *                             type: string
 *                           question_pic:
 *                             type: string
 *                           answer:
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





//*! /games/jawaban/:id_question
/**
 * @swagger
 * /games/jawaban/{id_question}:
 *   get:
 *     summary: Get all question from games data - admin exclusive
 *     tags: [Game - Jawaban Singkat]
 *     parameters:
 *       - name: id_question
 *         in: path
 *         required: true
 *         description: question id need to search
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: Get one jawaban singkat games question data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Data Pertanyaan dan Jawaban
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     question:
 *                       type: string
 *                     question_pic:
 *                       type: string
 *                     answer:
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
 *         description: Question data not found
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





//*! /games/jawaban
/**
 * @swagger
 * /games/jawaban:
 *   get:
 *     summary: Get all question from games data - admin exclusive
 *     tags: [Game - Jawaban Singkat]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: page number
 *       - name: per_page
 *         in: query
 *         description: how much document on 1 page, default set to 5
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: Get jawaban singkat games question data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Data Pertanyaan dan Jawaban
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_data:
 *                       type: number
 *                     current_page:
 *                       type: number
 *                     per_page:
 *                       type: number
 *                     questions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           question:
 *                             type: string
 *                           question_pic:
 *                             type: string
 *                           answer:
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





//*! /games/jawaban/play
/**
 * @swagger
 * /games/jawaban/play:
 *   post:
 *     summary: Post user answer and get the result for the game
 *     tags: [Game - Jawaban Singkat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question_lists:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                     question_pic:
 *                       type: string
 *                     answer:
 *                       type: string
 *                     user_answer:
 *                       type: string
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: Result Game - Jawaban Singkat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Result Game - Jawaban Singkat
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_question:
 *                       type: number
 *                     total_correct:
 *                       type: number
 *                     questions:
 *                       type: object
 *                       properties:
 *                         questions:
 *                           type: string
 *                         question_pic:
 *                           type: string
 *                         answer:
 *                           type: string
 *                         user_answer:
 *                           type: string
 *                         correct:
 *                           type: string
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





//*! /games/jawaban
/**
 * @swagger
 * /games/jawaban:
 *   post:
 *     summary: Post/ add new question from games data - admin exclusive
 *     tags: [Game - Jawaban Singkat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: Post/ tambah pertanyaan jawaban singkat games question data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Berhasil tambah pertanyaan baru
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





//*! /games/jawaban/{id_question}
/**
 * @swagger
 * /games/jawaban/{id_question}:
 *   patch:
 *     summary: Edit question from games data - admin exclusive
 *     tags: [Game - Jawaban Singkat]
 *     parameters:
 *       - name: id_question
 *         in: path
 *         required: true
 *         description: id question need to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: Edit pertanyaan jawaban singkat games question data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Sukses edit pertanyaan
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
 *         description: Question data not found
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





//*! /games/jawaban/{id_question}
/**
 * @swagger
 * /games/jawaban/{id_question}:
 *   delete:
 *     summary: Delete question from games data - admin exclusive
 *     tags: [Game - Jawaban Singkat]
 *     parameters:
 *       - name: id_question
 *         in: path
 *         required: true
 *         description: id question need to delete
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: Delete pertanyaan jawaban singkat games question data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Sukses hapus data pertanyaan
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
 *         description: Question data not found
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