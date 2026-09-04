const path = require('path');
// 解析上一层根目录下的 .env 文件
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// 如果你是在本地运行独立脚本，通常需要 dotenv 来读取 .env 文件里的环境变量

const mongoose = require('mongoose');
// 请确保这里的路径正确指向你的模型文件
const Place = require('./models/Place'); 

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGO_URL;

async function seedClanHouses() {
  if (!MONGO_URI) {
    console.error("错误: 找不到 MongoDB URI，请检查环境变量。");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ 成功连接到 MongoDB");

    const placesData = [
      {
        place_name: "Teoh Si Cheng Hoe Tong",
        place_category: "clan houses",
        place_address: "260, Lebuh Carnarvon, George Town, 10100 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3345, 5.4150] },
        place_summary: "Founded in 1891 by the Hakka tycoon Cheong Fatt Tze (whose Hokkien name was Teoh Thiaw Siat), this clan house serves the Teoh clansmen. Housed in a Straits Eclectic style building constructed in 1931, the clan temple is on the upper floor. Fun fact: Legend has it that the Teoh surname was bestowed by Emperor Huang to his grandson Hui, who invented a bow and pellet to defend the nation; the character for Teoh (Zhang) is a combination of the pictograms for 'bow' and 'long'.",
        place_information: { rating: 4.0, reviews_count: 6, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "No information", tuesday: "No information", wednesday: "No information", thursday: "No information", friday: "No information", saturday: "No information", sunday: "No information" },
        place_media: { thumbnail: "https://gtwhi.com.my/teoh-si-cheng-hoe-tong/", photos: [] }
      },
      {
        place_name: "Tay Koon Oh Kongsi",
        place_category: "clan houses",
        place_address: "70, Lebuh Penang, George Town, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3402, 5.4187] },
        place_summary: "Located along Penang Street, this historic Chinese clan association serves the Oh (or Hu) clan members. Like many clan houses established in the 19th century, it was a crucial welfare center for new immigrants arriving from China. Fun fact: Clan associations like this one were essential for survival, offering not just a place for ancestral worship, but acting as an employment agency and dispute settlement center for early migrants.",
        place_information: { rating: 4.5, reviews_count: 2, price_level: "N/A", phone: "+60 4-262 0480", website: "" },
        place_business_hours: { monday: "No information", tuesday: "No information", wednesday: "No information", thursday: "No information", friday: "No information", saturday: "No information", sunday: "No information" },
        place_media: { thumbnail: "https://gtwhi.com.my/wp-content/uploads/2019/04/Tay-Koon-Oh-Kongsi-e1554858177337-849x1024.jpg", photos: [] }
      },
      {
        place_name: "Seh Tek Tong Cheah Kongsi",
        place_category: "clan houses",
        place_address: "8, Lebuh Armenian, George Town, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3386, 5.4149] },
        place_summary: "Established in 1810 by the Cheah clan from Sek Tong Village in Fujian, this is the oldest of the 'Five Big Clans' in Penang. The architecture is a fascinating hybrid: it features a traditional Chinese ritual layout and roofs crowded with southern Chinese ornaments, but incorporates Malay-style stilt pillars and European-style lion heads. Fun fact: The compound was originally built like a self-contained village and is the first clan house in Malaysia to feature its own Interpretation Centre.",
        place_information: { rating: 4.2, reviews_count: 349, price_level: "RM 10", phone: "+60 4-261 3837", website: "https://cheahkongsi.org/" },
        place_business_hours: { monday: "9:30 am–4:30 pm", tuesday: "9:30 am–4:30 pm", wednesday: "9:30 am–4:30 pm", thursday: "9:30 am–4:30 pm", friday: "9:30 am–4:30 pm", saturday: "9:30 am–4:30 pm", sunday: "9:30 am–4:30 pm" },
        place_media: { thumbnail: "https://www.google.com/imgres?q=Seh%20Tek%20Tong%20Cheah%20Kongsi%20penang%20image&imgurl=https%3A%2F%2Fgtwhi.com.my%2Fwp-content%2Fuploads%2F2019%2F04%2FSeh-Tek-Tong-Cheah-Kongsi-1.jpg&imgrefurl=https%3A%2F%2Fgtwhi.com.my%2Fseh-tek-tong-cheah-kongsi%2F&docid=jS2qokVTFlR1iM&tbnid=mol_ue7iipSARM&vet=12ahUKEwjLxuud38OWAxVp2TgGHeWQMWkQnPAOegQIQRAA..i&w=2048&h=1152&hcb=2&ved=2ahUKEwjLxuud38OWAxVp2TgGHeWQMWkQnPAOegQIQRAA", photos: [] }
      },
      {
        place_name: "Ng See Kah Miew (Ng Ancestral Temple)",
        place_category: "clan houses",
        place_address: "40, Lebuh King, George Town, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3396, 5.4179] },
        place_summary: "Established in the early 19th century, the Ng Family Ancestral Temple boasts an ancient inner structure dating back to 1830. Around 1910, a newly constructed facade was built to encase the original building. Fun fact: The exterior of the temple features beautiful European Art Nouveau tiles, showcasing the unique cultural blending of Straits Eclectic architecture that was popular among wealthy Chinese clans in early Penang.",
        place_information: { rating: 4.3, reviews_count: 12, price_level: "N/A", phone: "+604-262 5557", website: "" },
        place_business_hours: { monday: "9 am–5 pm", tuesday: "9 am–5 pm", wednesday: "9 am–5 pm", thursday: "9 am–5 pm", friday: "9 am–5 pm", saturday: "9 am–5 pm", sunday: "Closed" },
        place_media: { thumbnail: "https://gtwhi.com.my/wp-content/uploads/2019/04/Ng-See-Kah-Miew-Ng-Ancestral-Temple-e1554859955251-849x1024.jpg", photos: [] }
      },
      {
        place_name: "Moey She Temple",
        place_category: "clan houses",
        place_address: "31, Lebuh Penang, George Town, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3407, 5.4179] },
        place_summary: "A lesser-known gem located in the Little India district, this Cantonese-style Taishanese clan temple was built in 1905 (with origins tracing back to 1841). It serves the Moey (or Boey, Mui) clansmen. Fun fact: Though the temple is only one story high, its imposing walls are built to the height of a two-story building. Its front gate is guarded by a pair of striking ceramic lions instead of the usual stone lions.",
        place_information: { rating: 4.9, reviews_count: 9, price_level: "N/A", phone: "+604-262 7519", website: "" },
        place_business_hours: { monday: "No information", tuesday: "No information", wednesday: "No information", thursday: "No information", friday: "No information", saturday: "No information", sunday: "No information" },
        place_media: { thumbnail: "https://gtwhi.com.my/moey-she-temple/", photos: [] }
      },
      {
        place_name: "Leong See Kah Miew",
        place_category: "clan houses",
        place_address: "65, Jln Perak, 10150 George Town, Pulau Pinang",
        place_location: { type: "Point", coordinates: [100.3347, 5.4201] },
        place_summary: "Tucked along the historic Muntri Street, Leong See Kah Miew serves as the ancestral temple for the Leong clan. The building features fine Chinese craftsmanship, especially in its woodwork and roof ridge ornamentation. Fun fact: Muntri Street itself was home to many wealthy Chinese merchants, and maintaining a clan house here was a symbol of the Leong family's status and solidarity in the bustling colonial port.",
        place_information: { rating: 5.0, reviews_count: 2, price_level: "N/A", phone: "+604-226 3346", website: "" },
        place_business_hours: { monday: "No information", tuesday: "No information", wednesday: "No information", thursday: "No information", friday: "No information", saturday: "No information", sunday: "No information" },
        place_media: { thumbnail: "https://www.google.com/imgres?q=Leong%20See%20Kah%20Miew%20penang%20image&imgurl=https%3A%2F%2Fgtwhi.com.my%2Fwp-content%2Fuploads%2F2019%2F04%2FLeong-See-Kah-Miew-e1554858035802.jpg&imgrefurl=https%3A%2F%2Fgtwhi.com.my%2Fleong-see-kah-miew%2F&docid=0HBZgfas5TabaM&tbnid=-_r6tgBCFLMUvM&vet=12ahUKEwj4oLi438OWAxUF-TgGHWSYNVYQnPAOegQIPBAA..i&w=1698&h=2048&hcb=2&ved=2ahUKEwj4oLi438OWAxUF-TgGHWSYNVYQnPAOegQIPBAA", photos: [] }
      },
      {
        place_name: "Leong San Tong Khoo Kongsi",
        place_category: "clan houses",
        place_address: "18, Cannon Square, George Town, 10450 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3371, 5.4143] },
        place_summary: "Established in 1851, this is arguably the grandest clan temple in Malaysia. Hidden in Cannon Square, it was built by the Khoos from Sin Kang Village in Fujian. Fun fact: The original temple built in 1901 was so lavish that it allegedly angered the gods and burned down on Chinese New Year's Eve! The current scaled-down (but still incredibly magnificent) version was completed in 1906, featuring intricate stone carvings, woodworks, and roof dragons.",
        place_information: { rating: 4.4, reviews_count: 2070, price_level: "RM 17", phone: "+60 4-261 4609", website: "khookongsi.com.my" },
        place_business_hours: { monday: "9 am–5 pm", tuesday: "9 am–5 pm", wednesday: "9 am–5 pm", thursday: "9 am–5 pm", friday: "9 am–5 pm", saturday: "9 am–5 pm", sunday: "9 am–5 pm" },
        place_media: { thumbnail: "https://www.google.com/imgres?q=Leong%20San%20Tong%20Khoo%20Kongsi%20penang%20image&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F4%2F47%2FKhoo_Kongsi_%2528I%2529.jpg%3Futm_source%3Den.wikipedia.org%26utm_campaign%3Dindex%26utm_content%3Doriginal&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FKhoo_Kongsi&docid=cM09cRVzN_NuPM&tbnid=hMkGuN7yURUMlM&vet=12ahUKEwi2y_fO38OWAxXIhGMGHSHnC8MQnPAOegUIswEQAA..i&w=5504&h=3670&hcb=2&ved=2ahUKEwi2y_fO38OWAxXIhGMGHSHnC8MQnPAOegUIswEQAA", photos: [] }
      },
      {
        place_name: "Lee Sih Chong Soo",
        place_category: "clan houses",
        place_address: "182-A, Jalan Burma, 10050 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3235, 5.4228] },
        place_summary: "Also known as the Lee Clan Association (Long Say Tong), this prominent clan house is located slightly outside the core heritage zone on Burmah Road. It serves the vast Lee clan in Penang. Fun fact: The temple's formal name 'Long Say' (Longxi) traces the Lee surname's ancient roots back to the Longxi Commandery in Gansu province, China, honoring their deep ancestral lineage.",
        place_information: { rating: 4.3, reviews_count: 63, price_level: "N/A", phone: "+604-226 7634", website: "" },
        place_business_hours: { monday: "No information", tuesday: "No information", wednesday: "No information", thursday: "No information", friday: "No information", saturday: "No information", sunday: "No information" },
        place_media: { thumbnail: "https://www.google.com/imgres?q=Lee%20Sih%20Chong%20Soo%20penang%20image&imgurl=https%3A%2F%2Fgtwhi.com.my%2Fwp-content%2Fuploads%2F2019%2F04%2FLee-Sih-Chong-Soo-1.jpg&imgrefurl=https%3A%2F%2Fgtwhi.com.my%2Flee-sih-chong-soo%2F&docid=DOrDy83LNs81JM&tbnid=L3-UMFFR4wIIHM&vet=12ahUKEwjf453Z38OWAxUP-TgGHZsQGfYQnPAOegQIQxAA..i&w=1365&h=2048&hcb=2&ved=2ahUKEwjf453Z38OWAxUP-TgGHZsQGfYQnPAOegQIQxAA", photos: [] }
      },
      {
        place_name: "Koong Har Tong Wong Si Chong Chi",
        place_category: "clan houses",
        place_address: "Jalan Jelutong, George Town, 11600 George Town, Pulau Pinang",
        place_location: { type: "Point", coordinates: [100.3409, 5.4172] },
        place_summary: "Serving the Wong (Ooi/Huang) clan, this association on Penang Street traces its roots to the ancient Jiangxia commandery. Fun fact: 'Koong Har' (Jiangxia) is the most famous ancestral hall name for the Huangs. According to legend, a vast golden cloud appeared when the emperor bestowed the surname, meaning 'yellow cloud', hence the deep pride the clan holds in their Jiangxia origins.",
        place_information: { rating: 3.7, reviews_count: 3, price_level: "N/A", phone: "+6011-6444 8153", website: "" },
        place_business_hours: { monday: "No information", tuesday: "No information", wednesday: "No information", thursday: "No information", friday: "No information", saturday: "No information", sunday: "No information" },
        place_media: { thumbnail: "https://www.google.com/imgres?q=Koong%20Har%20Tong%20Wong%20Si%20Chong%20Chi%20penang%20image&imgurl=https%3A%2F%2Fgtwhi.com.my%2Fwp-content%2Fuploads%2F2019%2F04%2FKoong-Har-Tong-Wong-Si-Chong-Chi-e1554191547291.jpg&imgrefurl=https%3A%2F%2Fgtwhi.com.my%2Fkoong-har-tong-wong-si-chong-chi%2F&docid=WL_m8rpm1aHQiM&tbnid=SeUaivvq56dOIM&vet=12ahUKEwisyuzh38OWAxWT4jgGHXwvAUkQnPAOegQISxAA..i&w=1863&h=2048&hcb=2&ved=2ahUKEwisyuzh38OWAxWT4jgGHXwvAUkQnPAOegQISxAA", photos: [] }
      },
      {
        place_name: "Koo Saing Wooi Koon",
        place_category: "clan houses",
        place_address: "67, Lebuh King, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3395, 5.4175] },
        place_summary: "Dating back to 1872, this is believed to be the oldest combined-clan temple in Malaysia. Uniquely, it does not serve one surname, but four: Lau, Kuan, Teoh, and Teo. Fun fact: The association's name is inspired by the famous classic novel 'Romance of the Three Kingdoms', celebrating the legendary brotherhood and loyalty sworn by Liu Bei (Lau), Guan Yu (Kuan), and Zhang Fei (Teoh) at the Peach Garden.",
        place_information: { rating: 3.8, reviews_count: 6, price_level: "N/A", phone: "+604-261 7886", website: "" },
        place_business_hours: { monday: "No information", tuesday: "No information", wednesday: "No information", thursday: "No information", friday: "No information", saturday: "No information", sunday: "No information" },
        place_media: { thumbnail: "https://gtwhi.com.my/koo-saing-wooi-koon/", photos: [] }
      },
      {
        place_name: "Kew Leong Tong Lim Kongsi",
        place_category: "clan houses",
        place_address: "Lebuh Ah Quee, George Town, 10450 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3382, 5.4158] },
        place_summary: "Established in 1863, this is the main clan house for the Lim family, one of the two most common surnames in Penang. Fun fact: The name 'Kew Leong Tong' translates to 'Hall of the Nine Dragons'. It honors an ancient Lim ancestor from the Tang Dynasty whose nine sons were all promoted to the position of chief magistrates!",
        place_information: { rating: 5.0, reviews_count: 1, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "No information", tuesday: "No information", wednesday: "No information", thursday: "No information", friday: "No information", saturday: "No information", sunday: "No information" },
        place_media: { thumbnail: "https://www.google.com/imgres?q=Kew%20Leong%20Tong%20Lim%20Kongsi%20penang%20image&imgurl=https%3A%2F%2Fgtwhi.com.my%2Fwp-content%2Fuploads%2F2019%2F04%2FKew-Leong-Tong-Lim-Kongsi_2-e1554191490950.jpg&imgrefurl=https%3A%2F%2Fgtwhi.com.my%2Fhar-yang-sit-teik-tong-yeoh-kongsi-2%2F&docid=OYBkCIaEDBHWHM&tbnid=HrBrwIIey3w9EM&vet=12ahUKEwiw3oD938OWAxVp1TgGHXkgFEMQnPAOegQIMxAA..i&w=1863&h=2048&hcb=2&ved=2ahUKEwiw3oD938OWAxVp1TgGHXkgFEMQnPAOegQIMxAA", photos: [] }
      },
      {
        place_name: "Har Yang Sit Teik Tong Yeoh Kongsi",
        place_category: "clan houses",
        place_address: "3, Chulia St Ghaut, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3398, 5.4155] },
        place_summary: "Founded in 1836, this is one of Penang's 'Big Five' Hokkien clan associations. The current temple was built in 1841. Fun fact: When it was first built, the temple sat right on the waterfront and even possessed its own private jetty! Land reclamation in the late 19th century eventually pushed the shoreline further out, creating Victoria Street in front of it.",
        place_information: { rating: 5.0, reviews_count: 1, price_level: "N/A", phone: "+60 11-1223 3990", website: "" },
        place_business_hours: { monday: "Closed", tuesday: "Closed", wednesday: "8 am-9 am", thursday: "8 am-9 am", friday: "Closed", saturday: "Closed", sunday: "Closed" },
        place_media: { thumbnail: "https://gtwhi.com.my/har-yang-sit-teik-tong-yeoh-kongsi/", photos: [] }
      },
      {
        place_name: "Eng Chuan Tong Tan Kongsi",
        place_category: "clan houses",
        place_address: "28, Seh Tan Court, Beach Street, 10300 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3363, 5.4131] },
        place_summary: "Founded in the early 19th century by the Tan family from Zhangzhou, this is claimed to be the oldest clan house in Penang. The main structure standing today was erected in 1878. Fun fact: The temple is devoted to Kai Zhang Sheng Wang (Tan Goan-kong), a famous Tang dynasty general who founded Zhangzhou. In the early 1900s, it also housed a school that taught Confucian classics.",
        place_information: { rating: 0.0, reviews_count: 0, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "9 am–5 pm", tuesday: "9 am–5 pm", wednesday: "9 am–5 pm", thursday: "9 am–5 pm", friday: "9 am–5 pm", saturday: "Closed", sunday: "Closed" },
        place_media: { thumbnail: "https://www.tripadvisor.com.my/Attraction_Review-g298303-d19445312-Reviews-Eng_Chuan_Tong_Tan_Kongsi-George_Town_Penang_Island_Penang.html", photos: [] }
      },
      {
        place_name: "Chin Si Thoong Soo",
        place_category: "clan houses",
        place_address: "64, Lebuh King, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3394, 5.4175] },
        place_summary: "Located on King Street, Chin Si Thoong Soo is the ancestral temple representing the Chin (or Chen) clan. King Street is famous for housing multiple clan and district associations back to back. Fun fact: Because so many clan houses and temples are squeezed onto this street, local Hokkiens used to refer to different sections of King Street by different dialect nicknames based on which clan dominated that block.",
        place_information: { rating: 5.0, reviews_count: 6, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "No information", tuesday: "No information", wednesday: "No information", thursday: "No information", friday: "No information", saturday: "No information", sunday: "No information" },
        place_media: { thumbnail: "https://gtwhi.com.my/chin-si-thoong-soo/", photos: [] }
      },
      {
        place_name: "Boon San Tong Khoo Kongsi",
        place_category: "clan houses",
        place_address: "117-A, Lebuh Victoria, 10300 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3377, 5.4136] },
        place_summary: "Built in 1878, Boon San Tong is the lesser-known 'brother' to the magnificent Leong San Tong Khoo Kongsi. It is one of the two ancestral temples belonging to the Khoo clan in Penang. Fun fact: While Leong San Tong was built for the entire Khoo clan, Boon San Tong was specifically built as a sub-clan house for a specific branch of the Khoo family, demonstrating the immense wealth and complex hierarchy of the Khoos in the 19th century.",
        place_information: { rating: 4.5, reviews_count: 65, price_level: "N/A", phone: "04-261 7054", website: "" },
        place_business_hours: { monday: "9:30 am–4:30 pm", tuesday: "9:30 am–4:30 pm", wednesday: "9:30 am–4:30 pm", thursday: "9:30 am–4:30 pm", friday: "9:30 am–4:30 pm", saturday: "9:30 am–4:30 pm", sunday: "9:30 am–4:30 pm" },
        place_media: { thumbnail: "https://travel2penang.org/2022/04/11/penang-perspective-boon-san-tong-khoo-kongsi/", photos: [] }
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

    console.log("----- 宗祠数据同步完成 -----");
    console.log(`总计处理数量: ${placesData.length} 个宗祠`);
    console.log(`✅ 全新插入 (New Inserts): ${result.upsertedCount} 个`);
    console.log(`🔄 更新覆盖 (Updates): ${result.modifiedCount} 个`);
    console.log(`(无变动的匹配: ${result.matchedCount - result.modifiedCount} 个)`);
    console.log("----------------------------");

  } catch (error) {
    console.error("执行时发生错误:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedClanHouses();