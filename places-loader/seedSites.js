const path = require('path');
// 解析上一层根目录下的 .env 文件
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// 如果你是在本地运行独立脚本，通常需要 dotenv 来读取 .env 文件里的环境变量

const mongoose = require('mongoose');
// 请确保这里的路径正确指向你的模型文件
const Place = require('./models/Place'); 

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGO_URL;

async function seedSites() {
  if (!MONGO_URI) {
    console.error("错误: 找不到 MongoDB URI，请检查环境变量。");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ 成功连接到 MongoDB");

    const placesData = [
      {
        place_name: "Syed Mustafa Wali Mausoleum",
        place_category: "Mausoleums & Cemeteries", // 合并分类
        place_address: "George Town, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3370, 5.4160] },
        place_summary: "A historical Islamic mausoleum located within the core heritage zone of George Town, serving as a resting place for the respected religious figure Syed Mustafa Wali. Fun fact: Like many ancient 'Keramat' (shrines) in Penang, it represents the deep-rooted Islamic heritage brought over by early Arab and Indian Muslim traders who established communities in the bustling port city.",
        place_information: { rating: 0, reviews_count: 0, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "No Information", tuesday: "No Information", wednesday: "No Information", thursday: "No Information", friday: "No Information", saturday: "No Information", sunday: "No Information" },
        place_media: { thumbnail: "https://gtwhi.com.my/syed-mustafa-wali-mausoleum/", photos: [] }
      },
      {
        place_name: "Syed Hussein Mausoleum",
        place_category: "Mausoleums & Cemeteries", // 合并分类
        place_address: "Lebuh Aceh, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3364, 5.4146] },
        place_summary: "This is the tomb of Tuanku Syed Hussein Aidid, a wealthy Acehnese royal and trader who founded the Acheen Street Mosque in 1808. Fun fact: Tuanku Syed Hussein was so influential that he actually became the Sultan of Aceh for a mere 3 days before handing the throne to his son! His tomb is uniquely situated directly in front of the mosque he built, surrounded by other Acehnese royalty.",
        place_information: { rating: 0, reviews_count: 0, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "No Information", tuesday: "No Information", wednesday: "No Information", thursday: "No Information", friday: "No Information", saturday: "No Information", sunday: "No Information" },
        place_media: { thumbnail: "https://gtwhi.com.my/syed-hussein-mausoleum/", photos: [] }
      },
      {
        place_name: "Protestant Cemetery",
        place_category: "Mausoleums & Cemeteries", // 合并分类
        place_address: "Jalan Sultan Ahmad Shah, 10050 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3332, 5.4230] },
        place_summary: "Opened in 1789, this Class 1 heritage site is the final resting place of Captain Francis Light, the founder of modern Penang. Fun fact: Strolling under the ancient frangipani trees, you can find the graves of many early colonial governors, merchants, and even Thomas Leonowens—the husband of Anna Leonowens, who famously inspired the story 'The King and I'.",
        place_information: { rating: 4.5, reviews_count: 84, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "8 am–6 pm", tuesday: "8 am–6 pm", wednesday: "8 am–6 pm", thursday: "8 am–6 pm", friday: "8 am–6 pm", saturday: "8 am–6 pm", sunday: "8 am–6 pm" },
        place_media: { thumbnail: "https://gtwhi.com.my/protestant-cemetery/", photos: [] }
      },
      {
        place_name: "Noordin Family Mausoleum",
        place_category: "Mausoleums & Cemeteries", // 合并分类
        place_address: "92, Jln Masjid Kapitan Keling, George Town, 10200 George Town, Pulau Pinang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3384, 5.4182] },
        place_summary: "Located near the Kapitan Keling Mosque, this beautiful tomb belongs to the prominent Noordin family, who were influential Indian Muslim merchants in the 19th century. Fun fact: The mausoleum features a striking prominent dome and minaret. It stands right on Chulia Street, reminding passersby of the immense wealth and philanthropic contributions of the Tamil Muslim diaspora in early Penang.",
        place_information: { rating: 0, reviews_count: 0, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "No Information", tuesday: "No Information", wednesday: "No Information", thursday: "No Information", friday: "No Information", saturday: "No Information", sunday: "No Information" },
        place_media: { thumbnail: "https://gtwhi.com.my/noordin-family-mausoleum/", photos: [] }
      },
      {
        place_name: "Little India",
        place_category: "cultural & heritage", // 参照已有分类
        place_address: "59, China St, Georgetown, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3395, 5.4172] },
        place_summary: "A vibrant, colorful ethnic enclave located around Market Street (Lebuh Pasar), filled with the scent of spices, Bollywood music, and traditional Indian attire. Fun fact: This area was historically known as the Chulia enclave, settled by early immigrants from the Coromandel Coast of India. Today, it remains the epicenter for Hindu festivals like Deepavali and Thaipusam in George Town.",
        place_information: { rating: 4.3, reviews_count: 17113, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "10 am-8.30 pm", tuesday: "10 am-8.30 pm", wednesday: "10 am-8.30 pm", thursday: "10 am-8.30 pm", friday: "10 am-8.30 pm", saturday: "10 am-8.30 pm", sunday: "10 am-8.30 pm" },
        place_media: { thumbnail: "https://en.wikipedia.org/wiki/Little_India,_Penang", photos: [] }
      },
      {
        place_name: "Kapitan Keling Family Mausoleum",
        place_category: "Mausoleums & Cemeteries", // 合并分类
        place_address: "13, Jalan Buckingham, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3373, 5.4162] },
        place_summary: "The final resting place of Cauder Mohuddeen and his family. He was the Kapitan Keling (Head of the Indian Muslim community) appointed by the British in the early 19th century. Fun fact: Despite building the grand Kapitan Keling Mosque, Cauder Mohuddeen’s tomb is actually tucked away in a more modest location nearby on Buckingham Street, serving as a quiet tribute to one of Penang's most important pioneer leaders.",
        place_information: { rating: 0, reviews_count: 0, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "No Information", tuesday: "No Information", wednesday: "No Information", thursday: "No Information", friday: "No Information", saturday: "No Information", sunday: "No Information" },
        place_media: { thumbnail: "https://gtwhi.com.my/kapitan-keling-family-mausoleum/", photos: [] }
      },
      {
        place_name: "Fort Cornwallis",
        place_category: "historical sites", // 参照已有分类
        place_address: "4, Jalan Tun Syed Sheh Barakbah, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3436, 5.4203] },
        place_summary: "Built by Captain Francis Light in 1786, this star-shaped fort is the largest standing fort in Malaysia. It was originally built of nibong palms before being upgraded to brick. Fun fact: The fort has never actually engaged in any combat! Inside, you will find the famous Seri Rambai cannon, which locals believe possesses magical properties to help women conceive.",
        place_information: { rating: 3.5, reviews_count: 4520, price_level: "RM 20", phone: "+6016-411 0000", website: "" },
        place_business_hours: { monday: "9 am-6 pm", tuesday: "9 am-6 pm", wednesday: "9 am-6 pm", thursday: "9 am-6 pm", friday: "9 am-6 pm", saturday: "9 am-6 pm", sunday: "9 am-6 pm" },
        place_media: { thumbnail: "https://www.thestar.com.my/metro/metro-news/2024/06/12/unveiling-layers-of-history", photos: [] }
      },
      {
        place_name: "Church Street Pier",
        place_category: "historical sites", // 参照已有分类
        place_address: "Pengkalan Weld, 10300 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3429, 5.4148] },
        place_summary: "Constructed in the 1890s, this historic pier was an essential maritime gateway for George Town when ships couldn't dock directly at the shallow shores. Fun fact: Before the Penang Bridge was built in 1985, piers along Weld Quay like this one were the bustling lifelines connecting the island to the mainland via a relentless fleet of ferries and small sampans.",
        place_information: { rating: 0, reviews_count: 0, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "No Information", tuesday: "No Information", wednesday: "No Information", thursday: "No Information", friday: "No Information", saturday: "No Information", sunday: "No Information" },
        place_media: { thumbnail: "https://gtwhi.com.my/church-street-pier/", photos: [] }
      },
      {
        place_name: "Chowrasta Market",
        place_category: "Markets", // 维持原本要求
        place_address: "28, 2, Jalan Kuala Kangsar, George Town, 10200 George Town, Pulau Pinang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3314, 5.4181] },
        place_summary: "Operating since 1890, Chowrasta Market is one of the oldest running wet markets in Penang. The word 'Chowrasta' means 'four cross-roads' in Urdu. Fun fact: While the ground floor is a bustling wet market, the upper floor is famous throughout Malaysia as a treasure trove for second-hand books! The market is also the absolute best place in Penang to buy local pickled fruits (Jeruk).",
        place_information: { rating: 4.3, reviews_count: 516, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "7 am–12.30 pm", tuesday: "7 am–12.30 pm", wednesday: "7 am–12.30 pm", thursday: "7 am–12.30 pm", friday: "7 am–12.30 pm", saturday: "7 am–12.30 pm", sunday: "7 am–12.30 pm" },
        place_media: { thumbnail: "https://gtwhi.com.my/chowrasta-market/", photos: [] }
      },
      {
        place_name: "Catholic Cemetery",
        place_category: "Mausoleums & Cemeteries", // 合并分类
        place_address: "161, Kelawai Rd, Georgetown, 10250 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.30795, 5.43839] },
        place_summary: "Located right next to the Protestant Cemetery on Northam Road, this burial ground was opened in the late 18th century. It served the early Catholic community of Penang. Fun fact: Many of the graves here belong to French missionaries, early Portuguese-Eurasian settlers who fled from Siam, and Hakka Chinese Catholics, reflecting the truly cosmopolitan nature of early George Town.",
        place_information: { rating: 3.5, reviews_count: 6, price_level: "N/A", phone: "+604-227 8297", website: "" },
        place_business_hours: { monday: "8 am–5 pm", tuesday: "8 am–5 pm", wednesday: "8 am–5 pm", thursday: "8 am–5 pm", friday: "8 am–5 pm", saturday: "8 am–5 pm", sunday: "8 am–5 pm" },
        place_media: { thumbnail: "https://www.malaymail.com/news/malaysia/2019/08/04/in-penang-a-visit-to-western-road-cemetery-is-a-walk-back-in-time/1777465", photos: [] }
      },
      {
        place_name: "Campbell Street Market",
        place_category: "Markets", // 维持原本要求
        place_address: "Lebuh Campbell, 10100 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3341, 5.4172] },
        place_summary: "Built around 1900, this striking Victorian-style market building sits at the corner of Campbell and Carnarvon Streets. It features distinct cast-iron structures imported from Britain. Fun fact: Long before it was a market, the site was actually an old Malay cemetery! Today, the beautifully preserved building stands as one of the most architecturally unique wet markets in Malaysia.",
        place_information: { rating: 4.1, reviews_count: 349, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "7 am–2 pm", tuesday: "7 am–2 pm", wednesday: "7 am–2 pm", thursday: "7 am–2 pm", friday: "7 am–2 pm", saturday: "7 am–2 pm", sunday: "7 am–2 pm" },
        place_media: { thumbnail: "https://gtwhi.com.my/campbell-street-market/", photos: [] }
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

    console.log("----- Sites 分类修改完成 -----");
    console.log(`总计处理数量: ${placesData.length} 个地点`);
    console.log(`✅ 全新插入 (New Inserts): ${result.upsertedCount} 个 (如果你刚刚运行过上一个脚本，这里应该是 0)`);
    console.log(`🔄 更新覆盖 (Updates): ${result.modifiedCount} 个`);
    console.log(`(无变动的匹配: ${result.matchedCount - result.modifiedCount} 个)`);
    console.log("------------------------------");

  } catch (error) {
    console.error("执行时发生错误:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedSites();