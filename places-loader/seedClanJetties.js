const path = require('path');
// 解析上一层根目录下的 .env 文件
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// 如果你是在本地运行独立脚本，通常需要 dotenv 来读取 .env 文件里的环境变量

const mongoose = require('mongoose');
// 请确保这里的路径正确指向你的模型文件
const Place = require('./models/Place'); 

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGO_URL;

async function seedClanJetties() {
  if (!MONGO_URI) {
    console.error("错误: 找不到 MongoDB URI，请检查环境变量。");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ 成功连接到 MongoDB");

    const placesData = [
      {
        place_name: "Yeoh Jetty 姓杨桥",
        place_category: "clan jetty",
        place_address: "114, Pintasan Pengkalan 1, George Town, 10300 George Town, Pulau Pinang",
        place_location: { type: "Point", coordinates: [100.3413, 5.4131] },
        place_summary: "Built in the late 19th century, the Yeoh Jetty was established by Hokkien immigrants from the Yeoh clan. Unlike the highly commercialized jetties, it retains a quiet, residential charm that gives a true glimpse into the traditional waterfront lifestyle. Fun fact: The jetty originally had a much longer wooden walkway extending deep into the sea, but parts of it were dismantled over the years due to coastal development and the construction of the nearby highway.",
        place_information: { rating: 4.3, reviews_count: 170, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "No Information", tuesday: "No Information", wednesday: "No Information", thursday: "No Information", friday: "No Information", saturday: "No Information", sunday: "No Information" },
        place_media: { thumbnail: "https://gtwhi.com.my/yeoh-jetty/", photos: [] }
      },
      {
        place_name: "Mixed Surname Jetty (New Jetty) 杂姓桥",
        place_category: "clan jetty",
        place_address: "New Jetty, Pengkalan Weld, Georgetown, 10300 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3413, 5.4131] },
        place_summary: "Known locally as 'Chap Seh Keo' (Mixed Surname Jetty), this settlement was established much later in the 1960s. It was formed by families of various surnames who did not belong to the other major single-surname jetties. Fun fact: Because it was built more recently compared to the 19th-century jetties, it is often referred to as the 'New Jetty' (or Peng Aun Jetty) and stands as the only clan jetty in Penang that isn't dominated by a single extended family lineage.",
        place_information: { rating: 3.9, reviews_count: 30, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "No Information", tuesday: "No Information", wednesday: "No Information", thursday: "No Information", friday: "No Information", saturday: "No Information", sunday: "No Information" },
        place_media: { thumbnail: "https://gtwhi.com.my/mixed-surname-jetty-new-jetty/", photos: [] }
      },
      {
        place_name: "Lee Jetty 姓李桥",
        place_category: "clan jetty",
        place_address: "57-58, Pengkalan Weld, 10300 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3376, 5.4101] },
        place_summary: "Established in the mid-19th century by immigrants bearing the Lee surname from Quanzhou, China. The Lee Jetty is well-known for its neat layout, straight wooden paths, and beautiful lighting at the entrance. Fun fact: In the old days, the Lee clan members were primarily involved in the barter trade and boat handling. Today, their jetty is distinctively characterized by a very uniform row of wooden houses that makes it one of the most orderly-looking jetties on the waterfront.",
        place_information: { rating: 4.2, reviews_count: 613, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "No Information", tuesday: "No Information", wednesday: "No Information", thursday: "No Information", friday: "No Information", saturday: "No Information", sunday: "No Information" },
        place_media: { thumbnail: "https://gtwhi.com.my/lee-jetty/", photos: [] }
      },
      {
        place_name: "Tan Jetty 姓陈桥",
        place_category: "clan jetty",
        place_address: "Pengkalan Weld, 10300 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3379, 5.4107] },
        place_summary: "Founded by the Tan clan from Quanzhou, China, this jetty is a favorite among photographers. It is famous for having a long, narrow wooden pier extending far out into the sea, offering stunning and unobstructed views of the mainland. Fun fact: At the very end of this long wooden boardwalk sits a small, picturesque red shrine dedicated to Mazu (Goddess of the Sea). It is arguably the best spot among all the jetties to capture the sunrise or sunset.",
        place_information: { rating: 4.2, reviews_count: 1274, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "No Information", tuesday: "No Information", wednesday: "No Information", thursday: "No Information", friday: "No Information", saturday: "No Information", sunday: "No Information" },
        place_media: { thumbnail: "https://gtwhi.com.my/tan-jetty/", photos: [] }
      },
      {
        place_name: "Chew Jetty 姓周桥",
        place_category: "clan jetty",
        place_address: "59A, Pengkalan Weld, 10300 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3385, 5.4116] },
        place_summary: "Established in the mid-19th century, Chew Jetty is the largest, most intact, and most famous of the Clan Jetties. It was founded by the Chew clan from Xinlin village in Fujian province and has since evolved into a vibrant tourist hub. Fun fact: It famously hosts an enormous and spectacular Jade Emperor God (Thnee Kong) birthday celebration on the 8th night of Chinese New Year, drawing tens of thousands of devotees and tourists to its waterfront.",
        place_information: { rating: 4.1, reviews_count: 10579, price_level: "N/A", phone: "+6011-6246 2884", website: "" },
        // 姓周桥有明确的告示牌呼吁游客晚上 9 点后不要进入，以尊重居民
        place_business_hours: { monday: "9 am–9 pm", tuesday: "9 am–9 pm", wednesday: "9 am–9 pm", thursday: "9 am–9 pm", friday: "9 am–9 pm", saturday: "9 am–9 pm", sunday: "9 am–9 pm" },
        place_media: { thumbnail: "https://gtwhi.com.my/chew-jetty/", photos: [] }
      },
      {
        place_name: "Lim Jetty 姓林桥",
        place_category: "clan jetty",
        place_address: "37, Pengkalan Weld, 10300 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3389, 5.4124] },
        place_summary: "Lim Jetty is one of the oldest clan jetties in Penang, established in the mid-19th century by immigrants of the Lim surname from Fujian, China. It is the closest jetty to the Swettenham Pier Cruise Terminal. Fun fact: Historically, the Lim Jetty members were tough coolies and boatmen who dominated the cargo loading operations in their specific sector of the port. A beautiful traditional community temple greets visitors right at the entrance of the jetty.",
        place_information: { rating: 4.2, reviews_count: 304, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "9 am–9 pm", tuesday: "9 am–9 pm", wednesday: "9 am–9 pm", thursday: "9 am–9 pm", friday: "9 am–9 pm", saturday: "9 am–9 pm", sunday: "9 am–9 pm" },
        place_media: { thumbnail: "https://gtwhi.com.my/ms/lim-jetty", photos: [] }
      },
      {
        place_name: "Ong Jetty 姓王桥",
        place_category: "clan jetty",
        place_address: "Pengkalan Weld, 10300 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3370, 5.4082] },
        place_summary: "The Ong Jetty was once part of the bustling waterfront settlements for Chinese immigrants. However, unlike the larger jetties that survived, it has largely been lost to urban development, land reclamation, and the construction of flats over the decades. Fun fact: Today, the original sprawling wooden stilt houses of the Ong Jetty are gone. Only a small remnant, including a community temple, remains to mark the historical spot where the clan once lived and worked on the mudflats.",
        place_information: { rating: 5.0, reviews_count: 1, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "No Information", tuesday: "No Information", wednesday: "No Information", thursday: "No Information", friday: "No Information", saturday: "No Information", sunday: "No Information" },
        place_media: { thumbnail: "https://gtwhi.com.my/ong-jetty/", photos: [] }
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

    console.log("----- 姓氏桥数据同步完成 -----");
    console.log(`总计处理数量: ${placesData.length} 座姓氏桥`);
    console.log(`✅ 全新插入 (New Inserts): ${result.upsertedCount} 个`);
    console.log(`🔄 更新覆盖 (Updates): ${result.modifiedCount} 个`);
    console.log(`(无变动的匹配: ${result.matchedCount - result.modifiedCount} 个)`);
    console.log("------------------------------");

  } catch (error) {
    console.error("执行时发生错误:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedClanJetties();