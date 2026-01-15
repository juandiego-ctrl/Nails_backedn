const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// GET all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new appointment
router.post('/', async (req, res) => {
  const appointment = new Appointment({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    date: req.body.date,
    time: req.body.time,
    service: req.body.service,
    notes: req.body.notes
  });

  try {
    const newAppointment = await appointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE appointment
router.delete('/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET availability for a date
router.get('/availability', async (req, res) => {
  const { date } = req.query;
  try {
    const appointments = await Appointment.find({ date: new Date(date) });
    const bookedTimes = appointments.map(a => a.time);
    const allTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
    const availableTimes = allTimes.filter(time => !bookedTimes.includes(time));
    res.json({ availableTimes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST book appointment
router.post('/book', async (req, res) => {
  const appointment = new Appointment({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    date: req.body.date,
    time: req.body.time,
    service: req.body.service,
    notes: req.body.notes
  });

  try {
    const newAppointment = await appointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
