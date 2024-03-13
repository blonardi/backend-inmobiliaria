import mongoose from 'mongoose'

// export const houseSchema = mongoose.Schema({

//   price: {
//     type: Number,
//     required: true
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   address: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   listing_url: {
//     type: String,
//     required: true
//   }
//   // dimention: {
//   //   type: Number,
//   //   required: true
//   // },
//   // type: {
//   //   type: String,
//   //   required: true
//   // },
//   // location: {
//   //   type: String,
//   //   required: true
//   // },
//   // realEstate: {
//   //   type: String,
//   //   required: true
//   // },
//   // listing_url: {}
// })

export const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },

  author: {
    type: String,
    required: true
  },
  tags: {
    type: [String]
  },
  permalink: {
    type: String,
    required: true,
    uniqe: true
  },
  date: {
    type: Date,
    required: true
  }
})

export const houseSchema = mongoose.Schema({
  permalink: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  houseImage: {
    type: String,
    required: true
  },
  dimention: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  realEstate: {
    type: String,
    required: true
  }
})
