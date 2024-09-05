import z from 'zod';
import { Category, Activity, User } from '../../models/index.js';
import Scrypt from '../../utils/scrypt.js';

const adminMemberController = {
  membersPage: (req, res) => {
    res.render('admin-members', { currentPage: 'members' });
  },
};

export default adminMemberController;
