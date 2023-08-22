import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterController } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.get('/', academicSemesterController.getAllFromDB);
router.get('/:id', academicSemesterController.getDataById);
router.post(
  '/',
  validateRequest(academicSemesterValidation.create),
  academicSemesterController.insertIntoDB
);

router.patch(
  '/:id',
  validateRequest(academicSemesterValidation.update),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  academicSemesterController.updateOneInDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  academicSemesterController.deleteByIdFromDB
);

export const academicSemesterRoutes = router;
