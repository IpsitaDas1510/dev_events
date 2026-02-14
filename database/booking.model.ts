// import { Schema, model, models, Document, Types } from 'mongoose';
// import Event from './event.model';

// // TypeScript interface for Booking document
// export interface IBooking extends Document {
//   eventId: Types.ObjectId;
//   email: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const BookingSchema = new Schema<IBooking>(
//   {
//     eventId: {
//       type: Schema.Types.ObjectId,
//       ref: 'Event',
//       required: [true, 'Event ID is required'],
//     },
//     email: {
//       type: String,
//       required: [true, 'Email is required'],
//       trim: true,
//       lowercase: true,
//       validate: {
//         validator: function (email: string) {
//           // RFC 5322 compliant email validation regex
//           const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
//           return emailRegex.test(email);
//         },
//         message: 'Please provide a valid email address',
//       },
//     },
//   },
//   {
//     timestamps: true, // Auto-generate createdAt and updatedAt
//   }
// );

// // Pre-save hook to validate events exists before creating booking
// BookingSchema.pre('save', async function (next) {
//   const booking = this as IBooking;

//   // Only validate eventId if it's new or modified
//   if (booking.isModified('eventId') || booking.isNew) {
//     try {
//       const eventExists = await Event.findById(booking.eventId).select('_id');

//       if (!eventExists) {
//         const error = new Error(`Event with ID ${booking.eventId} does not exist`);
//         error.name = 'ValidationError';
//         return next(error);
//       }
//     } catch {
//       const validationError = new Error('Invalid events ID format or database error');
//       validationError.name = 'ValidationError';
//       return next(validationError);
//     }
//   }

//   next();
// });

// // Create index on eventId for faster queries
// BookingSchema.index({ eventId: 1 });

// // Create compound index for common queries (events bookings by date)
// BookingSchema.index({ eventId: 1, createdAt: -1 });

// // Create index on email for user booking lookups
// BookingSchema.index({ email: 1 });

// // Enforce one booking per events per email
// BookingSchema.index({ eventId: 1, email: 1 }, { unique: true, name: 'uniq_event_email' });
// const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

// export default Booking;














// import { Schema, model, models, Document, Types } from 'mongoose';
// import Event from './event.model';

// // TypeScript interface for Booking document
// export interface IBooking extends Document {
//   eventId: Types.ObjectId;
//   email: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const BookingSchema = new Schema<IBooking>(
//   {
//     eventId: {
//       type: Schema.Types.ObjectId,
//       ref: 'Event',
//       required: [true, 'Event ID is required'],
//     },
//     email: {
//       type: String,
//       required: [true, 'Email is required'],
//       trim: true,
//       lowercase: true,
//       validate: {
//         validator: function (email: string) {
//           // RFC 5322 compliant email validation regex
//           const emailRegex =
//             /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

//           return emailRegex.test(email);
//         },
//         message: 'Please provide a valid email address',
//       },
//     },
//   },
//   {
//     timestamps: true, // Auto-generate createdAt and updatedAt
//   }
// );

// // ✅ Modern Mongoose v7+ Pre-save hook (NO next, NO callback style)
// BookingSchema.pre('save', async function () {
//   const booking = this as IBooking;

//   // Only validate eventId if new or modified
//   if (booking.isModified('eventId') || booking.isNew) {
//     try {
//       const eventExists = await Event.findById(booking.eventId).select('_id');

//       if (!eventExists) {
//         const error = new Error(
//           `Event with ID ${booking.eventId} does not exist`
//         );
//         error.name = 'ValidationError';
//         throw error;
//       }
//     } catch (err) {
//       const validationError = new Error(
//         'Invalid Event ID format or database error'
//       );
//       validationError.name = 'ValidationError';
//       throw validationError;
//     }
//   }
// });

// // Indexes
// BookingSchema.index({ eventId: 1 });
// BookingSchema.index({ eventId: 1, createdAt: -1 });
// BookingSchema.index({ email: 1 });
// BookingSchema.index(
//   { eventId: 1, email: 1 },
//   { unique: true, name: 'uniq_event_email' }
// );

// const Booking =
//   models.Booking || model<IBooking>('Booking', BookingSchema);

// export default Booking;




import { Schema, model, models, Document, Types } from "mongoose";
import Event from "./event.model";

/* ------------------ TypeScript Interface ------------------ */

export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  status: "confirmed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

/* ------------------ Schema ------------------ */

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email: string) {
          const emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

          return emailRegex.test(email);
        },
        message: "Please provide a valid email address",
      },
    },

    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  {
    timestamps: true,
  }
);

/* ------------------ Pre-save Validation ------------------ */
/* Ensures event exists before creating booking */

BookingSchema.pre("save", async function () {
  const booking = this as IBooking;

  if (booking.isModified("eventId") || booking.isNew) {
    try {
      const eventExists = await Event.findById(booking.eventId).select("_id");

      if (!eventExists) {
        const error = new Error(
          `Event with ID ${booking.eventId} does not exist`
        );
        error.name = "ValidationError";
        throw error;
      }
    } catch {
      const validationError = new Error(
        "Invalid Event ID format or database error"
      );
      validationError.name = "ValidationError";
      throw validationError;
    }
  }
});

/* ------------------ Indexes ------------------ */

// Faster queries
BookingSchema.index({ eventId: 1 });
BookingSchema.index({ eventId: 1, createdAt: -1 });
BookingSchema.index({ email: 1 });

// ✅ Allow only ONE confirmed booking per event per email
// If cancelled → user can rebook
BookingSchema.index(
  { eventId: 1, email: 1 },
  {
    unique: true,
    partialFilterExpression: { status: "confirmed" },
    name: "uniq_event_email_confirmed",
  }
);

/* ------------------ Export Model ------------------ */

const Booking =
  models.Booking || model<IBooking>("Booking", BookingSchema);

export default Booking;
