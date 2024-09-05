import { z } from 'zod';
import { Booking } from '../../models/index.js';

const bookingSchema = z.object({

  date: z.string().min(1),
  status: z.string().min(1),
  nb_tickets: z.number().int().min(0).optional(),
  client_id: z.number().int().min(1),
});
const bookingController = {


  async getAllBooking(req, res) {
    const bookings = await Booking.findAll({
      order: [['date', 'ASC']],
      include: ['client'],
    });
    res.json(bookings);
  },

  async getOneBooking(req, res) {
    const idBooking = req.params.id;

    const booking = await Booking.findByPk(idBooking);
    res.json(booking);
  },
  async createBooking(req, res) {
    const dataBooking = bookingSchema.parse(req.body);

    const booking = await Booking.create(dataBooking);
    res.status(201).json(booking);
  },
  async updateBooking(req, res) {
    const idBooking = req.params.id;
    const dataBooking = bookingSchema.partial().parse(req.body);
    const booking = await Booking.findByPk(idBooking);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    await booking.update(dataBooking);
    res.json(booking);
  },
  async deleteBooking(req, res) {
    const idBooking = req.params.id;

    const booking = await Booking.findByPk(idBooking);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    await booking.destroy();

    res.status(204).send();
  },
};

export default bookingController;
