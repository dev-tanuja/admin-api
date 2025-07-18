const ActivityTicket = require("../models/ActivityTicket");
const Slot = require("../models/Slot");

exports.addTicket = async (req, res) => {
  try {
    const {
      name,
      slug,
      banner_img,
      mobile_banner_img,
      short_description,
      description,
      additional_information,
      featured_img,
      gallery_images,
      highlights,
      cancellation_policy,
      inclusions,
      timing_info,
      price_variation,
      location,
      pickup_location,
      video_link,
      status,
      slots
    } = req.body;

    const activityTicket = new ActivityTicket({
      name,
      slug,
      banner_img,
      mobile_banner_img,
      short_description,
      description,
      additional_information,
      featured_img,
      gallery_images,
      highlights,
      cancellation_policy,
      inclusions,
      timing_info,
      price_variation,
      location,
      pickup_location,
      video_link,
      status
    });

    const savedTicket = await activityTicket.save();

    if (slots) {
      const slotData = new Slot({
        activityId: savedTicket._id,
        defaultSlots: slots.defaultSlots,
        customOverrides: slots.customOverrides
      });

      await slotData.save();
    }

    res.status(201).json({
      message: "Activity ticket created successfully",
      activityTicket: savedTicket
    });

  } catch (error) {
    console.error("Create ticket error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
