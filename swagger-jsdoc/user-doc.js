//*! /users/checks
/**
 * @swagger
 * /users/checks:
 *   get:
 *     summary: Check username availability data within query parameter inputted
 *     tags: [Users]
 *     parameters:
 *       - name: username
 *         in: query
 *         description: username need to check
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: Get User Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Info ketersediaan username
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     availability:
 *                       type: boolean
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





//*! /users/self
/**
 * @swagger
 * /users/self:
 *   get:
 *     summary: Get self user data
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: Get User Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Info User
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     name:
 *                       type: string
 *                     role:
 *                       type: string
 *                     last_video:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         title:
 *                           type: string
 *                         description:
 *                           type: string
 *                         link:
 *                           type: string
 *                     emergency_contact:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         no_telp:
 *                           type: string
 *
 *       '404':
 *         description: User data not found
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





//*! /users/:username
/**
 * @swagger
 * /users/{username}:
 *   get:
 *     summary: Get one user data - just admin can get all user data
 *     tags: [Users]
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: username need to search
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: Get User Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Info User
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     name:
 *                       type: string
 *                     role:
 *                       type: string
 *                     last_video:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         title:
 *                           type: string
 *                         description:
 *                           type: string
 *                         link:
 *                           type: string
 *                     emergency_contact:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         no_telp:
 *                           type: string
 *
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
 *         description: User data not found
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





//*! /username/password
/**
 * @swagger
 * /users/password:
 *   patch:
 *     summary: Change user password data
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               new_password:
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: Success User Change Password Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: User sukses ganti password
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





//*! /users/emergency
/**
 * @swagger
 * /users/emergency:
 *   patch:
 *     summary: Change user emergency contact info data
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               telp:
 *                 type: string
 *                 example: 081227888999
 *
 *     responses:
 *       '200':
 *         description: Success User Change Emergency Contact Info Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Berhasil ubah kontak emergensi
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





//*! /users
/**
 * @swagger
 * /users:
 *   patch:
 *     summary: Change user info data
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               name:
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: Success User Change Info Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: User sukses ubah info akun
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