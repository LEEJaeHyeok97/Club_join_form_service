import { Router } from "express";

const router = Router();


//목록 조회
router.get('/', async(req, res) => {
    
    const postDatas = await Posts.findAll({});
    
    return res.json({
        data: postDatas
    });
});



export default router;