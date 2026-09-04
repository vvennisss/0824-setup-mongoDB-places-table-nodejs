const path = require('path');
// 解析上一层根目录下的 .env 文件
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// 如果你是在本地运行独立脚本，通常需要 dotenv 来读取 .env 文件里的环境变量

const mongoose = require('mongoose');
// 请确保这里的路径正确指向你的模型文件
const Place = require('./models/Place'); 

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGO_URL;

async function seedMonuments() {
  if (!MONGO_URI) {
    console.error("错误: 找不到 MongoDB URI，请检查环境变量。");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ 成功连接到 MongoDB");

    const placesData = [
      {
        place_name: "Yeng Keng Hotel Gateway",
        place_category: "monuments",
        place_address: "362 & 366, Lebuh Chulia, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3341, 5.4187] },
        place_summary: "A beautifully preserved traditional Chinese archway standing proudly on Chulia Street. It marks the entrance to the Yeng Keng Hotel, which was originally built as a private Anglo-Indian bungalow in the mid-19th century before becoming a hotel in the early 1900s. Fun fact: This gateway is one of the few surviving independent Chinese archways in George Town, showcasing exquisite plaster stucco decorations that reflect the immense wealth of early Chinese tycoons.",
        place_information: { rating: 4.6, reviews_count: 362, price_level: "N/A", phone: "+604-262 2177", website: "https://www.yengkenghotel.com/" },
        place_business_hours: { monday: "Open 24 hours", tuesday: "Open 24 hours", wednesday: "Open 24 hours", thursday: "Open 24 hours", friday: "Open 24 hours", saturday: "Open 24 hours", sunday: "Open 24 hours" },
        place_media: { thumbnail: "https://gtwhi.com.my/yeng-keng-hotel-gateway/", photos: [] }
      },
      {
        place_name: "Queen Victoria Memorial Clock Tower",
        place_category: "monuments",
        place_address: "Lebuh Light, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3440, 5.4168] },
        place_summary: "Commissioned in 1897 by local Penang millionaire Cheah Chen Eok to commemorate Queen Victoria's Diamond Jubilee, this stunning Moorish-style clock tower was completed in 1902. Fun fact: The tower is exactly 60 feet tall, with each foot representing one year of the Queen's reign up to her Jubilee. Due to Allied bombing during WWII, the tower actually leans slightly to one side!",
        place_information: { rating: 4.2, reviews_count: 1514, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "Open 24 hours", tuesday: "Open 24 hours", wednesday: "Open 24 hours", thursday: "Open 24 hours", friday: "Open 24 hours", saturday: "Open 24 hours", sunday: "Open 24 hours" },
        place_media: { thumbnail: "https://gtwhi.com.my/queen-victoria-memorial-clock-tower/", photos: [] }
      },
      {
        place_name: "Logan Memorial",
        place_category: "monuments",
        place_address: "Lebuh Light, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3396, 5.4206] },
        place_summary: "Erected in memory of James Richardson Logan, a Scottish lawyer who passionately defended the rights of the non-European communities in Penang against the British East India Company. He passed away in 1869. Fun fact: Because the monument looks so grand, many locals historically mistook him for a powerful Governor, rather than a fiercely independent lawyer who fought for the common people!",
        place_information: { rating: 4.3, reviews_count: 22, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "Open 24 hours", tuesday: "Open 24 hours", wednesday: "Open 24 hours", thursday: "Open 24 hours", friday: "Open 24 hours", saturday: "Open 24 hours", sunday: "Open 24 hours" },
        place_media: { thumbnail: "https://gtwhi.com.my/logan-memorial/", photos: [] }
      },
      {
        place_name: "Koh Seang Tat Fountain",
        place_category: "monuments",
        place_address: "Jalan Tun Syed Sheh Barakbah, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3404, 5.4215] },
        place_summary: "This elegant cast-iron fountain was presented to the Municipal Council in 1883 by Koh Seang Tat, a wealthy local merchant and the great-grandson of Captain Francis Light's business partner, Koh Lay Huan. Fun fact: It was originally installed near the Town Hall but fell into disrepair and disappeared for decades, before being meticulously restored and reinstated by the Penang Heritage Trust in modern times.",
        place_information: { rating: 3.8, reviews_count: 4, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "Open 24 hours", tuesday: "Open 24 hours", wednesday: "Open 24 hours", thursday: "Open 24 hours", friday: "Open 24 hours", saturday: "Open 24 hours", sunday: "Open 24 hours" },
        place_media: { thumbnail: "https://gtwhi.com.my/koh-seang-tat-fountain/", photos: [] }
      },
      {
        place_name: "Francis Light Memorial",
        place_category: "monuments",
        place_address: "Jalan Sultan Ahmad Shah, 10050 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3332, 5.4231] },
        place_summary: "Located within the Protestant Cemetery, this beautiful classical domed pavilion was erected to honor Captain Francis Light, the British founder of modern Penang. Fun fact: Visitors often mistake this grand structure for Francis Light's actual grave. In reality, his remains are buried under a surprisingly modest and plain stone slab just a few steps away from this memorial.",
        place_information: { rating: 4.3, reviews_count: 11, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "No Information", tuesday: "No Information", wednesday: "No Information", thursday: "No Information", friday: "No Information", saturday: "No Information", sunday: "No Information" },
        place_media: { thumbnail: "https://gtwhi.com.my/francis-light-memorial/", photos: [] }
      },
      {
        place_name: "Cenotaph War Memorial",
        place_category: "monuments",
        place_address: "Esplanade, Jalan Tun Syed Sheh Barakbah, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3411, 5.4212] },
        place_summary: "Situated at the Esplanade, this memorial originally commemorated the Allied soldiers from Penang who died during World War I. Later plaques were added to honor the fallen of WWII, the Malayan Emergency, and the Indonesian Confrontation. Fun fact: The original Cenotaph was completely destroyed by Allied bombs during WWII. In 1948, a local architectural firm rebuilt it to look exactly like the original structure from 1929.",
        place_information: { rating: 4.3, reviews_count: 139, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "Open 24 hours", tuesday: "Open 24 hours", wednesday: "Open 24 hours", thursday: "Open 24 hours", friday: "Open 24 hours", saturday: "Open 24 hours", sunday: "Open 24 hours" },
        place_media: { thumbnail: "https://en.wikipedia.org/wiki/The_Cenotaph,_Penang", photos: [] }
      },
      {
        place_name: "23LoveLane Hotel Gate",
        place_category: "monuments",
        place_address: "23, Lorong Love, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3371, 5.4190] },
        place_summary: "A distinctive historic gateway leading into the courtyard of what is now the 23LoveLane boutique hotel. The property dates back to the 1800s and incorporates a mix of Anglo-Indian and Chinese architectural styles. Fun fact: Love Lane got its romantic name because wealthy Straits Chinese tycoons and European merchants who lived on nearby Muntri Street historically kept their mistresses in this quieter, tucked-away alley!",
        place_information: { rating: 0, reviews_count: 0, price_level: "N/A", phone: "+604 -262 1323", website: "https://www.23lovelane.com/" },
        place_business_hours: { monday: "Open 24 hours", tuesday: "Open 24 hours", wednesday: "Open 24 hours", thursday: "Open 24 hours", friday: "Open 24 hours", saturday: "Open 24 hours", sunday: "Open 24 hours" },
        place_media: { thumbnail: "https://gtwhi.com.my/23lovelane-hotel-gate/", photos: [] }
      }
    ];

    const bulkOperations = placesData.map(place => ({
      updateOne: {
        filter: { place_name: place.place_name },
        update: {
          $set: {
            ...place,
            updatedAt: new Date()
          },
          $setOnInsert: {
            createdAt: new Date()
          }
        },
        upsert: true
      }
    }));

    const result = await Place.bulkWrite(bulkOperations);

    console.log("----- Monuments (纪念碑与地标) 数据同步完成 -----");
    console.log(`总计处理数量: ${placesData.length} 个地点`);
    console.log(`✅ 全新插入 (New Inserts): ${result.upsertedCount} 个`);
    console.log(`🔄 更新覆盖 (Updates): ${result.modifiedCount} 个`);
    console.log(`(无变动的匹配: ${result.matchedCount - result.modifiedCount} 个)`);
    console.log("----------------------------------------------");

  } catch (error) {
    console.error("执行时发生错误:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedMonuments();