import { gst_details as GstDetails } from 'src/gstdetails/entities/gstdetail.entity';
import { Gstin_Business } from './entities/gst_buss.entity';
import { Gstin_Detail } from './entities/gst_detail.entity';
import { Gstin_filing } from './entities/gst_filing.entity';
import { User } from './entities/user.entity';

export const entities = [
  User,
  Gstin_Detail,
  Gstin_Business,
  Gstin_filing,
  GstDetails,
];

export { User, Gstin_Business, Gstin_Detail, Gstin_filing };
