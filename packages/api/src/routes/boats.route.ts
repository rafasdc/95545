import * as express from "express"
import * as boatController from "../controllers/boats.controller"

const router = express.Router()

router.get("/", boatController.getAllBoats)
router.get("/:id", boatController.getBoat)
router.put("/:id", boatController.updateBoat)
router.delete("/:id", boatController.deleteBoat)
router.post("/", boatController.createBoat)

export default router
