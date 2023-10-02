//*! /maps/{id_maps}
/**
 * @swagger
 * /maps/{id_maps}:
 *   get:
 *     summary: Get maps disaster data
 *     tags: [Disaster-Maps]
 *     parameters:
 *       - name: id_maps
 *         in: path
 *         description: id maps need to search
 *       - name: data_disaster_only
 *         in: query
 *         description: if true, will return only data disaster within the maps data 
 *       - name: id_disaster 
 *         in: query
 *         description: id disaster need to search and data_disaster_only must be true
 * 
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200_all_data':
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
 *                           _id:
 *                             type: string
 *                           nama:
 *                             type: string
 *                           long:
 *                             type: number
 *                           lat:
 *                             type: number
 *                           data:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 nama:
 *                                   type: string
 *                                 total:
 *                                   type: number
 *                
 *       '200_disaster_only':
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
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 nama:
 *                                   type: string
 *                                 total:
 *                                   type: number    
 * 
 *       '200_disaster_only_one_data':
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
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 nama:
 *                                   type: string
 *                                 total:
 *                                   type: number              
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





//*! /maps
/**
 * @swagger
 * /maps:
 *   get:
 *     summary: Get maps disaster data
 *     tags: [Disaster-Maps]
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
 *                     maps:
 *                       type: array
 *                       items:
 *                         type: object  
 *                         properties:
 *                           _id:
 *                             type: string
 *                           nama:
 *                             type: string
 *                           long:
 *                             type: number
 *                           lat:
 *                             type: number
 *                           data:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 nama:
 *                                   type: string
 *                                 total:
 *                                   type: number
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





//*! /maps
/**
 * @swagger
 * /maps:
 *   post:
 *     summary: Post new maps (province) data - admin exclusive
 *     tags: [Disaster-Maps]
 *     security:
 *       - bearerAuth: []  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *               long:
 *                 type: number
 *               lat:
 *                 type: number
 *
 *
 *     responses:
 *       '200':
 *         description: Post new article data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success add new maps location data
 *
 *       '400':
 *         description: Process Post new article error
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





//*! /maps/disasters
/**
 * @swagger
 * /maps/disasters:
 *   patch:
 *     summary: Post new maps (province) disaster data - admin exclusive
 *     tags: [Disaster-Maps]
 *     security:
 *       - bearerAuth: []  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_maps:
 *                 type: string
 *               id_disaster:
 *                 type: string    
 *               nama:
 *                 type: string
 *               total:
 *                 type: number
 *               add_data:
 *                 type: boolean
 *               del_data:
 *                 type: boolean     
 *               edit_data:
 *                 type: boolean 
 *               edit_total_data:
 *                 type: boolean   
 *
 *
 *     responses:
 *       '200':
 *         description: Post new article data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success edit maps data
 *
 *       '400':
 *         description: Process Post new article error
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





//*! /maps
/**
 * @swagger
 * /maps:
 *   patch:
 *     summary: Edit maps data - admin exclusive
 *     tags: [Disaster-Maps]
 *     security:
 *       - bearerAuth: []  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_maps:
 *                 type: string  
 *               nama:
 *                 type: string 
 *               long:
 *                 type: number
 *               lat:
 *                 type: number    
 *
 *
 *     responses:
 *       '200':
 *         description: Post new article data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success edit maps data
 *
 *       '400':
 *         description: Process Post new article error
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





//*! /maps
/**
 * @swagger
 * /maps:
 *   delete:
 *     summary: Delete new maps (province) data - admin exclusive
 *     tags: [Disaster-Maps]
 *     security:
 *       - bearerAuth: []  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_maps:
 *                 type: string
 *
 *
 *     responses:
 *       '200':
 *         description: Post new article data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success delete maps data
 *
 *       '400':
 *         description: Process Post new article error
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