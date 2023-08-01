//*! /games/pilgan/play
/**
 * @swagger
 * /games/pilgan/play:
 *   get:
 *     summary: Play Game, get question - Pilgan
 *     tags: [Game - Pilgan]
 *     parameters:
 *       - name: number_question
 *         in: query
 *         description: how much question need to get
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: Play Game - Pilgan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Play Game - Pilgan
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





//*! /games/pilgan/:id_question
/**
 * @swagger
 * /games/pilgan/{id_question}:
 *   get:
 *     summary: Get all question from games data - admin exclusive
 *     tags: [Game - Pilgan]
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
 *         description: Get one pilgan games question data
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
 *                     choices:
 *                       type: array
 *                       items:
 *                         type: string
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





//*! /games/pilgan
/**
 * @swagger
 * /games/pilgan:
 *   get:
 *     summary: Get all question from games data - admin exclusive
 *     tags: [Game - Pilgan]
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
 *         description: Get pilgan games question data
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
 *                           choices:
 *                             type: array
 *                             items:
 *                               type: string
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





//*! /games/pilgan/play
/**
 * @swagger
 * /games/pilgan/play:
 *   post:
 *     summary: Post user answer and get the result for the game
 *     tags: [Game - Pilgan]
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
 *         description: Result Game - Pilihan Ganda
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Result Game - Pilihan Ganda
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_question:
 *                       type: number
 *                     total_correct:
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
 *                           choices:
 *                             type: array
 *                             items:
 *                               tyoe: string
 *                           answer:
 *                             type: string
 *                           user_answer:
 *                             type: string
 *                           correct:
 *                             type: boolean
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





//*! /games/pilgan
/**
 * @swagger
 * /games/pilgan:
 *   post:
 *     summary: Post/ add new question from games data - admin exclusive
 *     tags: [Game - Pilgan]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               choices:
 *                 type: array
 *                 items:
 *                   type: string
 *               answer:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: Post/ tambah pertanyaan pilgan games question data
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
 *       '400':
 *         description: Error post new question
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





//*! /games/pilgan/{id_question}
/**
 * @swagger
 * /games/pilgan/{id_question}:
 *   patch:
 *     summary: Edit question from games data - admin exclusive
 *     tags: [Game - Pilgan]
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
 *               choices:
 *                 type: array
 *                 items:
 *                   type: string
 *               answer:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: Edit pertanyaan pilgan singkat games question data
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
 *       '400':
 *         description: Error edit question
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





//*! /games/pilgan/{id_question}
/**
 * @swagger
 * /games/pilgan/{id_question}:
 *   delete:
 *     summary: Delete question from games data - admin exclusive
 *     tags: [Game - Pilgan]
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
 *         description: Delete pertanyaan pilgan games question data
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