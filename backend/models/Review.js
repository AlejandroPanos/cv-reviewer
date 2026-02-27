/* Create imports */
const mongoose = require("mongoose");
const { Schema } = mongoose;
const Anthropic = require("@anthropic-ai/sdk");
const { systemPrompt, userPrompt, assistantPrompt } = require("../helpers/scripts");

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/* Create schema */
const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
    resumeText: {
      type: String,
      required: [true, "Resume text is required"],
      trim: true,
    },
    jobDescriptionText: {
      type: String,
      required: [true, "Job description text is required"],
      trim: true,
    },
    overallAssessment: {
      score: {
        type: Number,
        required: true,
        min: [1, "Score must be at least 1"],
        max: [100, "Score cannot exceed 100"],
      },
      text: {
        type: String,
        required: true,
        trim: true,
      },
    },
    atsOptimization: {
      score: {
        type: Number,
        required: true,
        min: [1, "Score must be at least 1"],
        max: [100, "Score cannot exceed 100"],
      },
      actionablePoints: {
        type: [String],
        default: [],
      },
    },
    impactQuantification: {
      score: {
        type: Number,
        required: true,
        min: [1, "Score must be at least 1"],
        max: [100, "Score cannot exceed 100"],
      },
      actionablePoints: {
        type: [String],
        default: [],
      },
    },
    structureReadability: {
      score: {
        type: Number,
        required: true,
        min: [1, "Score must be at least 1"],
        max: [100, "Score cannot exceed 100"],
      },
      actionablePoints: {
        type: [String],
        default: [],
      },
    },
    redFlags: {
      score: {
        type: Number,
        required: true,
        min: [1, "Score must be at least 1"],
        max: [100, "Score cannot exceed 100"],
      },
      actionablePoints: {
        type: [String],
        default: [],
      },
    },
  },
  {
    timestamps: true,
  },
);

/* Create methods */
reviewSchema.methods.getAverageScore = function () {
  const scores = [
    this.atsOptimization.score,
    this.impactQuantification.score,
    this.structureReadability.score,
    this.redFlags.score,
  ];

  const sum = scores.reduce((acc, score) => acc + score, 0);
  return Math.round(sum / scores.length);
};

reviewSchema.statics.createReview = async function (userId, resumeText, jobDescriptionText) {
  if (!userId || !resumeText || !jobDescriptionText) {
    throw new Error("User ID, resume text, and job description must be provided");
  }

  const message = await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 4096,
    system: systemPrompt,
    messages: [
      { role: "user", content: userPrompt(resumeText, jobDescriptionText) },
      // { role: "assistant", content: assistantPrompt },
    ],
    output_config: {
      format: {
        type: "json_schema",
        schema: {
          type: "object",
          properties: {
            overallAssessment: {
              type: "object",
              properties: {
                score: { type: "number" },
                text: { type: "string" },
              },
              required: ["score", "text"],
              additionalProperties: false,
            },
            atsOptimization: {
              type: "object",
              properties: {
                score: { type: "number" },
                actionablePoints: {
                  type: "array",
                  items: { type: "string" },
                },
              },
              required: ["score", "actionablePoints"],
              additionalProperties: false,
            },
            impactQuantification: {
              type: "object",
              properties: {
                score: { type: "number" },
                actionablePoints: {
                  type: "array",
                  items: { type: "string" },
                },
              },
              required: ["score", "actionablePoints"],
              additionalProperties: false,
            },
            structureReadability: {
              type: "object",
              properties: {
                score: { type: "number" },
                actionablePoints: {
                  type: "array",
                  items: { type: "string" },
                },
              },
              required: ["score", "actionablePoints"],
              additionalProperties: false,
            },
            redFlags: {
              type: "object",
              properties: {
                score: { type: "number" },
                actionablePoints: {
                  type: "array",
                  items: { type: "string" },
                },
              },
              required: ["score", "actionablePoints"],
              additionalProperties: false,
            },
          },
          required: [
            "overallAssessment",
            "atsOptimization",
            "impactQuantification",
            "structureReadability",
            "redFlags",
          ],
          additionalProperties: false,
        },
      },
    },
    temperature: 0.7,
  });

  const reviewData = JSON.parse(message.content[0].text);

  // Create and save the review to the database
  const review = await this.create({
    userId,
    resumeText,
    jobDescriptionText,
    ...reviewData,
  });

  return review;
};

/* Create export */
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
