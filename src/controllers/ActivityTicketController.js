const ActivityTicket = require("../models/ActivityTicket");
const Slot = require("../models/Slot");

exports.addTicket = async (req, res) => {
  try {
    const {
      name,
      slug,
      categoryId,
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
      categoryId,
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


exports.getAllTicket = async (req, res) => { 

  try {
    const activities = await ActivityTicket.find({}, 'name featured_img categoryId slug short_description banner_img')
                            .populate('banner_img', 'url alt')                 // populate from Upload collection
                            .populate('featured_img', 'url alt')
                            .populate('categoryId', 'name slug');

    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities
    });

  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }


}

exports.getTicketBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const activity = await ActivityTicket.findOne({ slug })
      .populate('banner_img')
      .populate('mobile_banner_img')
      .populate('featured_img')
      .populate('gallery_images')
      .populate('categoryId')
      .populate('Location');
      const slots = await Slot.find({ activityId: activity._id });


    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.status(200).json({
      success: true,
      data: {
        ...activity.toObject(),  
        slots                    
      }
    });

  } catch (error) {
    console.error('Error fetching activity by slug:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

