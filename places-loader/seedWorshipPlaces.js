const path = require('path');
// 解析上一层根目录下的 .env 文件
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// 如果你是在本地运行独立脚本，通常需要 dotenv 来读取 .env 文件里的环境变量

const mongoose = require('mongoose');
// 请确保这里的路径正确指向你的模型文件
const Place = require('./models/Place'); 

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGO_URL;

async function seedWorshipPlaces() {
  if (!MONGO_URI) {
    console.error("错误: 找不到 MongoDB URI，请检查环境变量。");
    return;
  }

  try {
    // 1. 使用 Mongoose 连接数据库
    await mongoose.connect(MONGO_URI);
    console.log("✅ 成功连接到 MongoDB");

    // 2. 13 个槟城宗教场所的真实数据
    const placesData = [
      {
        place_name: "ACHEEN STREET MALAY MOSQUE",
        place_category: "places of worship",
        place_address: "Lebuh Acheh, George Town, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3364, 5.4146] },
        place_summary: "Built in 1808, this iconic historic mosque stands out with its unique octagonal minaret featuring Moorish and classical architecture. It once served as the hub for Islamic studies and the gathering point for Haj pilgrims in the 19th century.",
        place_information: { rating: 4.6, reviews_count: 245, price_level: "Free", phone: "", website: "" },
        place_business_hours: { monday: "5 am–10 pm", tuesday: "5 am–10 pm", wednesday: "5 am–10 pm", thursday: "5 am–10 pm", friday: "5 am–10 pm", saturday: "5 am–10 pm", sunday: "5 am–10 pm" },
        place_media: { thumbnail: "https://www.google.com/search?sca_esv=1fa2dd9354242582&rlz=1C1CHZN_enMY1080MY1081&sxsrf=APpeQnuFuUTf3uuZlk_cH6MqUfXdVq8kHA:1787905900995&udm=2&fbs=ABfTbFVyMZGZf1hfvX9uKjN_-G8c4u0nXx4bEIpwm1lnNH832QGGMdFXpDyzkQgEdtB8w9zZ67Faapx8wIWp8O3JpX8ZbooJTg6IC0i9eLmD380spGv6NINAeg_HJyBuR6QjI7951HK9EKRB5hNGHk2jQAygJh8JhPnXf7pNv4MU1uSDhNVOP9Z8RYq3ZU1gqdobZbii09zlkhZ_IXKHs_q6753JskeklQ&q=ACHEEN+STREET+MALAY+MOSQUE+image&sa=X&ved=2ahUKEwiBgfvA9MKWAxUOkOEIHUyULKAQtKgLegQIFRAB&biw=911&bih=944&dpr=1#sv=CAMSURoyKhBlLTJMbTg5YS1BdjFaMW1NMg4yTG04OWEtQXYxWjFtTToOb2VCeXpFdFBvT3M1aU0gBCoXCgFzEhBlLTJMbTg5YS1BdjFaMW1NGAEwARgHIO-KwK0DSggQARgBIAEoAQ", photos: [] }
      },
      {
        place_name: "ALIMSAH WALEY MOSQUE",
        place_category: "places of worship",
        place_address: "Lebuh Chulia, George Town, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.33464, 5.41889] },
        place_summary: "Established in the early 19th century by the local Indian Muslim community, this mosque on Chulia Street serves as a peaceful sanctuary in the bustling heart of George Town.",
        place_information: { rating: 4.4, reviews_count: 85, price_level: "Free", phone: "", website: "" },
        place_business_hours: { monday: "5 am–9 pm", tuesday: "5 am–9 pm", wednesday: "5 am–9 pm", thursday: "5 am–9 pm", friday: "5 am–9 pm", saturday: "5 am–9 pm", sunday: "5 am–9 pm" },
        place_media: { thumbnail: "https://www.google.com/search?q=ALIMSAH+WALEY+MOSQUE+image&sca_esv=1fa2dd9354242582&rlz=1C1CHZN_enMY1080MY1081&udm=2&biw=911&bih=944&sxsrf=APpeQntPCwFppBst9yLn-bR6VMPA2MOQEA%3A1787905903434&ei=b0eRap32Ga61hvcPm-qg-QU&ved=0ahUKEwjd6Y_C9MKWAxWumuEIHRs1KF8Q4dUDCBE&uact=5&oq=ALIMSAH+WALEY+MOSQUE+image&gs_lp=Egtnd3Mtd2l6LWltZyIaQUxJTVNBSCBXQUxFWSBNT1NRVUUgaW1hZ2VIpQZQAFgAcAB4AJABAJgBWKABWKoBATG4AQPIAQD4AQL4AQGYAgCgAgCYAwCSBwCgBwyyBwC4BwDCBwDIBwCACAE&sclient=gws-wiz-img#sv=CAMSURoyKhBlLUNMZGZjd3RLeUR5VnNNMg5DTGRmY3d0S3lEeVZzTToOazFOWTBBblRHZVhhdE0gBCoXCgFzEhBlLUNMZGZjd3RLeUR5VnNNGAEwARgHIPKoi6EESggQARgBIAEoAQ", photos: [] }
      },
      {
        place_name: "BENGGALI MOSQUE",
        place_category: "places of worship",
        place_address: "Lebuh Leith, George Town, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.33356, 5.42021] },
        place_summary: "Tucked away on Leith Street, this historical mosque was founded by the Bengali Muslim community. It remains an important spiritual and cultural landmark representing the diverse Islamic heritage in Penang.",
        place_information: { rating: 4.5, reviews_count: 112, price_level: "Free", phone: "", website: "" },
        place_business_hours: { monday: "5 am–9 pm", tuesday: "5 am–9 pm", wednesday: "5 am–9 pm", thursday: "5 am–9 pm", friday: "5 am–9 pm", saturday: "5 am–9 pm", sunday: "5 am–9 pm" },
        place_media: { thumbnail: "https://gtwhi.com.my/ms/benggali-mosque", photos: [] }
      },
      {
        place_name: "CHURCH OF THE ASSUMPTION",
        place_category: "places of worship",
        place_address: "3, Lebuh Farquhar, George Town, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3385, 5.4215] },
        place_summary: "Established in 1786 shortly after Captain Francis Light landed in Penang, this stunning church is the oldest Catholic church in the northern region of Malaysia, boasting gorgeous colonial architecture.",
        place_information: { rating: 4.6, reviews_count: 156, price_level: "Free", phone: "+60 4-261 4172", website: "" },
        place_business_hours: { monday: "8 am–6 pm", tuesday: "8 am–6 pm", wednesday: "8 am–6 pm", thursday: "8 am–6 pm", friday: "8 am–6 pm", saturday: "8 am–7 pm", sunday: "8 am–2 pm" },
        place_media: { thumbnail: "https://www.sunwayhotels.com/sunway-georgetown/experiences/church-of-the-assumption", photos: [] }
      },
      {
        place_name: "GODDESS OF MERCY TEMPLE",
        place_category: "places of worship",
        place_address: "Jalan Masjid Kapitan Keling, George Town, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3386, 5.4185] },
        place_summary: "Built in 1728, this is the oldest Chinese temple in Penang. Dedicated to Kuan Yin, the Goddess of Mercy, its ornate roofs and dragon-entwined pillars make it a magnificent and deeply spiritual site for locals.",
        place_information: { rating: 4.6, reviews_count: 1450, price_level: "Free", phone: "", website: "" },
        place_business_hours: { monday: "8 am–6 pm", tuesday: "8 am–6 pm", wednesday: "8 am–6 pm", thursday: "8 am–6 pm", friday: "8 am–6 pm", saturday: "8 am–6 pm", sunday: "8 am–6 pm" },
        place_media: { thumbnail: "https://gtwhi.com.my/goddess-of-mercy-temple/", photos: [] }
      },
      {
        place_name: "HOCK TEIK CHENG SIN TEMPLE",
        place_category: "places of worship",
        place_address: "57, Armenian Street, George Town, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3372, 5.4151] },
        place_summary: "Also known as Poh Hock Seah, this hidden gem on Armenian Street features stunning classical Chinese architecture and serves as a significant clan temple tied to the early Hokkien community in Penang.",
        place_information: { rating: 4.5, reviews_count: 220, price_level: "Free", phone: "", website: "" },
        place_business_hours: { monday: "8 am–5 pm", tuesday: "8 am–5 pm", wednesday: "8 am–5 pm", thursday: "8 am–5 pm", friday: "8 am–5 pm", saturday: "8 am–5 pm", sunday: "8 am–5 pm" },
        place_media: { thumbnail: "https://gtwhi.com.my/hock-teik-cheng-sin-temple/", photos: [] }
      },
      {
        place_name: "KAPITAN KELING MOSQUE",
        place_category: "places of worship",
        place_address: "14, Jalan Buckingham, George Town, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3375, 5.4167] },
        place_summary: "Founded in 1801 by the head of the Indian Muslim community, this spectacular Indo-Moorish mosque is characterized by its brilliant white façade and striking black domes, forming a pivotal landmark of George Town.",
        place_information: { rating: 4.7, reviews_count: 2130, price_level: "Free", phone: "+60 4-261 4215", website: "" },
        place_business_hours: { monday: "9:30 am–5:30 pm", tuesday: "9:30 am–5:30 pm", wednesday: "9:30 am–5:30 pm", thursday: "9:30 am–5:30 pm", friday: "9:30 am–5:30 pm", saturday: "9:30 am–5:30 pm", sunday: "9:30 am–5:30 pm" },
        place_media: { thumbnail: "https://www.malaymail.com/news/malaysia/2025/11/18/penang-designates-seven-19th-century-mosques-including-masjid-kapitan-keling-as-official-heritage-sites/198838", photos: [] }
      },
      {
        place_name: "KING STREET TUA PEK KONG TEMPLE",
        place_category: "places of worship",
        place_address: "King Street, George Town, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.34007, 5.41841] },
        place_summary: "A vibrant traditional temple built by the early Cantonese and Hakka communities, dedicated to Tua Pek Kong (God of Prosperity). It features beautiful ancestral halls and intricate wood carvings.",
        place_information: { rating: 4.5, reviews_count: 140, price_level: "Free", phone: "", website: "" },
        place_business_hours: { monday: "8 am–5 pm", tuesday: "8 am–5 pm", wednesday: "8 am–5 pm", thursday: "8 am–5 pm", friday: "8 am–5 pm", saturday: "8 am–5 pm", sunday: "8 am–5 pm" },
        place_media: { thumbnail: "https://gtwhi.com.my/king-street-tua-pek-kong-temple/", photos: [] }
      },
      {
        place_name: "SRI MAHAMARIAMMAN TEMPLE",
        place_category: "places of worship",
        place_address: "Lebuh Queen, George Town, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3391, 5.4172] },
        place_summary: "The oldest Hindu temple in Penang, standing since 1833. Located in Little India, it is famous for its magnificent gopuram (gateway tower) densely covered with incredibly detailed sculptures of Hindu deities.",
        place_information: { rating: 4.6, reviews_count: 890, price_level: "Free", phone: "", website: "" },
        place_business_hours: { monday: "6:30 am–12 pm, 4:30–9 pm", tuesday: "6:30 am–12 pm, 4:30–9 pm", wednesday: "6:30 am–12 pm, 4:30–9 pm", thursday: "6:30 am–12 pm, 4:30–9 pm", friday: "6:30 am–12 pm, 4:30–9:30 pm", saturday: "6:30 am–12 pm, 4:30–9 pm", sunday: "6:30 am–12 pm, 4:30–9 pm" },
        place_media: { thumbnail: "https://en.wikipedia.org/wiki/Sri_Mahamariamman_Temple,_Penang", photos: [] }
      },
      {
        place_name: "ST FRANCIS XAVIER CHURCH",
        place_category: "places of worship",
        place_address: "52K, Jalan Penang, George Town, 10000 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.33253, 5.42211] },
        place_summary: "Constructed in the 1850s to serve the Tamil Catholic community, this historic parish on Penang Road combines spiritual heritage with beautiful, well-preserved European architectural elements.",
        place_information: { rating: 4.5, reviews_count: 175, price_level: "Free", phone: "+60 4-261 0086", website: "" },
        place_business_hours: { monday: "9 am–5 pm", tuesday: "9 am–5 pm", wednesday: "9 am–5 pm", thursday: "9 am–5 pm", friday: "9 am–5 pm", saturday: "9 am–6 pm", sunday: "8 am–1 pm" },
        place_media: { thumbnail: "https://gtwhi.com.my/st-francis-xavier-church/", photos: [] }
      },
      {
        place_name: "ST GEORGE’S CHURCH",
        place_category: "places of worship",
        place_address: "1, Lebuh Farquhar, George Town, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3388, 5.4203] },
        place_summary: "Built in 1818, this majestic Anglican church is the oldest purpose-built Anglican church in Southeast Asia. Its striking Georgian architecture and elegant white columns make it an essential historical landmark.",
        place_information: { rating: 4.6, reviews_count: 678, price_level: "Free", phone: "+60 4-261 2739", website: "stgeorgeschurchpenang.com" },
        place_business_hours: { monday: "9 am–4 pm", tuesday: "9 am–4 pm", wednesday: "9 am–4 pm", thursday: "9 am–4 pm", friday: "9 am–4 pm", saturday: "Closed", sunday: "8 am–12 pm" },
        place_media: { thumbnail: "https://www.thestar.com.my/metro/metro-news/2023/05/02/anglican-church-elevated", photos: [] }
      },
      {
        place_name: "WU TI MEOW (WAR EMPEROR’S TEMPLE)",
        place_category: "places of worship",
        place_address: "36, King Street, George Town, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3400, 5.4180] },
        place_summary: "Dedicated to Guan Gong, the God of War and Righteousness, this temple on King Street was established in the 1830s. It features beautiful calligraphy and forms an integral part of the Toi San Association's heritage.",
        place_information: { rating: 4.4, reviews_count: 85, price_level: "Free", phone: "", website: "" },
        place_business_hours: { monday: "8 am–5 pm", tuesday: "8 am–5 pm", wednesday: "8 am–5 pm", thursday: "8 am–5 pm", friday: "8 am–5 pm", saturday: "8 am–5 pm", sunday: "8 am–5 pm" },
        place_media: { thumbnail: "https://www.google.com/imgres?q=WU%20TI%20MEOW%20(WAR%20EMPEROR%E2%80%99S%20TEMPLE)%20penang%20image&imgurl=https%3A%2F%2Fgtwhi.com.my%2Fwp-content%2Fuploads%2F2019%2F04%2FWu-Ti-Meow-War-Emperor%25E2%2580%2599s-Temple.jpg&imgrefurl=https%3A%2F%2Fgtwhi.com.my%2Fwu-ti-meow-war-emperors-temple%2F&docid=rtV26o_r4M22GM&tbnid=1bLom3yvvEr8zM&vet=12ahUKEwi438iJ0cOWAxV-zjgGHRsyL-oQnPAOegQIQhAA..i&w=2048&h=1360&hcb=2&ved=2ahUKEwi438iJ0cOWAxV-zjgGHRsyL-oQnPAOegQIQhAA", photos: [] }
      },
      {
        place_name: "YAP KONGSI TEMPLE",
        place_category: "places of worship",
        place_address: "71, Armenian Street, George Town, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3373, 5.4153] },
        place_summary: "Serving as the clan association for the Hokkien Chinese of the Yap surname, this elegant temple on Armenian Street features stunning roof ridges, intricate ancestral tablets, and a deeply peaceful courtyard.",
        place_information: { rating: 4.4, reviews_count: 125, price_level: "Free", phone: "", website: "" },
        place_business_hours: { monday: "9 am–5 pm", tuesday: "9 am–5 pm", wednesday: "9 am–5 pm", thursday: "9 am–5 pm", friday: "9 am–5 pm", saturday: "9 am–5 pm", sunday: "9 am–5 pm" },
        place_media: { thumbnail: "https://www.tripadvisor.com/Attraction_Review-g298303-d13566683-Reviews-Yap_Kongsi_Temple-George_Town_Penang_Island_Penang.html", photos: [] }
      }
    ];

    // 3. 构建 Mongoose Model 的 bulkWrite 操作
    const bulkOperations = placesData.map(place => ({
      updateOne: {
        filter: { place_name: place.place_name },
        update: {
          $set: {
            ...place,
            updatedAt: new Date() // Mongoose 的 bulkWrite 默认不会触发 pre-save hook，所以手动传入时间最保险
          },
          $setOnInsert: {
            createdAt: new Date()
          }
        },
        upsert: true
      }
    }));

    // 4. 执行操作 (使用你的 Place model)
    const result = await Place.bulkWrite(bulkOperations);

    // 5. 打印结果
    console.log("----- 同步完成 -----");
    console.log(`总计处理数量: ${placesData.length} 个地点`);
    console.log(`✅ 全新插入 (New Inserts): ${result.upsertedCount} 个`);
    console.log(`🔄 更新覆盖 (Updates): ${result.modifiedCount} 个`);
    console.log(`(无变动的匹配: ${result.matchedCount - result.modifiedCount} 个)`);
    console.log("--------------------");

  } catch (error) {
    console.error("执行时发生错误:", error);
  } finally {
    // 关闭 Mongoose 连接
    mongoose.connection.close();
  }
}

seedWorshipPlaces();