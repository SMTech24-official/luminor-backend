"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetireProfessionalRoute = void 0;
const express_1 = __importDefault(require("express"));
const professsional_controller_1 = require("./professsional.controller");
const multer_1 = require("../../middlewares/multer");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const professional_validation_1 = require("./professional.validation");
const parseJson_1 = require("../../middlewares/parseJson");
const router = express_1.default.Router();
exports.RetireProfessionalRoute = router;
router.post("/signUp", multer_1.multerUpload.single("cvOrCoverLetter"), parseJson_1.parseNestedJSON, (0, validateRequest_1.default)(professional_validation_1.RetireProfessionalValidation.signUpZodSchema), professsional_controller_1.RetireProfessionalController.createProfessional);
router.patch("/profile/:id", multer_1.multerUpload.single("workSample"), professsional_controller_1.RetireProfessionalController.updateSingleRetireProfessional);
router.get("/", professsional_controller_1.RetireProfessionalController.getReitereProfessionals);
