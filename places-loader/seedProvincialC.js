const path = require('path');
// 解析上一层根目录下的 .env 文件
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// 如果你是在本地运行独立脚本，通常需要 dotenv 来读取 .env 文件里的环境变量

const mongoose = require('mongoose');
// 请确保这里的路径正确指向你的模型文件
const Place = require('./models/Place'); 

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGO_URL;

async function seedProvincialAssociations() {
  if (!MONGO_URI) {
    console.error("错误: 找不到 MongoDB URI，请检查环境变量。");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ 成功连接到 MongoDB");

    const placesData = [
      {
        place_name: "Tsen Lung Fui Kon",
        place_category: "provincial associations",
        place_address: "22, King Street, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.34038, 5.41889] },
        place_summary: "Established by Hakka immigrants from the Zenglong district of Guangdong, this district association serves the Tsen Lung community. It is situated on King Street, an area historically dense with various clan and district associations. Fun fact: King Street was traditionally segregated into different sections by dialect groups, and this Hakka association stands right next to the Kar Yin Association, showcasing the close-knit nature of early Hakka immigrants.",
        place_information: { rating: 4.5, reviews_count: 6, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "No Information", tuesday: "No Information", wednesday: "No Information", thursday: "No Information", friday: "No Information", saturday: "No Information", sunday: "No Information" },
        place_media: { thumbnail: "https://gtwhi.com.my/tsen-lung-fui-kon/", photos: [] }
      },
      {
        place_name: "Toi Shan Ningyang Wui Kwon",
        place_category: "provincial associations",
        place_address: "36 & 38, King Street, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3400, 5.4182] },
        place_summary: "A prominent district association serving the Toi Shan (Taishan) community who originated from the Canton province. It was built to foster solidarity among Taishanese immigrants. Fun fact: Taishanese people were among the earliest Chinese diaspora globally. In 19th-century Penang, associations like this functioned not just as temples, but as vital immigrant receiving centers, employment agencies, and dispute mediation halls.",
        place_information: { rating: 4, reviews_count: 61, price_level: "N/A", phone: "+604-262 5295", website: "" },
        place_business_hours: { monday: "No Information", tuesday: "No Information", wednesday: "No Information", thursday: "No Information", friday: "No Information", saturday: "No Information", sunday: "No Information" },
        place_media: { thumbnail: "https://gtwhi.com.my/provincial-associations/#", photos: [] }
      },
      {
        place_name: "Thean Hou Temple (Hainan Association and Temple)",
        place_category: "provincial associations",
        place_address: "93, Lebuh Muntri, 10450 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.33462, 5.42009] },
        place_summary: "Founded in 1866 and completed in 1895, this Hainanese temple and association is dedicated to Mazu, the Goddess of the Sea. It was built by Hainanese immigrants who were mostly seafarers and renowned cooks. Fun fact: The exquisite sung-dynasty style stone carvings on the temple's facade were crafted by artisans brought directly from China in 1995 to commemorate the building's centenary.",
        place_information: { rating: 4.6, reviews_count: 155, price_level: "N/A", phone: "+604-262 3752", website: "" },
        place_business_hours: { monday: "8 am–5 pm", tuesday: "8 am–5 pm", wednesday: "8 am–5 pm", thursday: "8 am–5 pm", friday: "8 am–5 pm", saturday: "8 am–5 pm", sunday: "8 am–5 pm" },
        place_media: { thumbnail: "https://gtwhi.com.my/thean-hou-temple-hainan-association-and-temple/", photos: [] }
      },
      {
        place_name: "Sun Wui Wui Koon",
        place_category: "provincial associations",
        place_address: "38, Lebuh Bishop, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3396, 5.4178] },
        place_summary: "Established in the 1870s, this is a district association for the Cantonese migrants from the Xinhui (Sun Wui) district. Featuring distinctive gray brick walls and grand granite gate posts, it serves both as a cultural hub and a temple. Fun fact: The main altar is dedicated to Guan Gong (the God of War), and the association's classic Cantonese architecture makes it one of the most underrated, photogenic heritage gems in George Town.",
        place_information: { rating: 4.6, reviews_count: 20, price_level: "N/A", phone: "+60 4-261 5918", website: "" },
        place_business_hours: { monday: "No Information", tuesday: "No Information", wednesday: "No Information", thursday: "No Information", friday: "No Information", saturday: "No Information", sunday: "No Information" },
        place_media: { thumbnail: "https://gtwhi.com.my/sun-wui-wui-koon/", photos: [] }
      },
      {
        place_name: "Soon Tuck Wooi Kwon",
        place_category: "provincial associations",
        place_address: "51, Love Lane, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3364, 5.4190] },
        place_summary: "Founded in 1838, this association was established to provide a network, welfare, and community support for immigrants hailing from the Shunde (Soon Tuck) district of Guangdong. Fun fact: Located on the famous Love Lane, this association sits amidst a street that was historically a melting pot of Eurasian, Chinese, and Indian communities, showing how district associations integrated into the diverse urban fabric of colonial Penang.",
        place_information: { rating: 4.4, reviews_count: 7, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "9 am-1 pm", tuesday: "9 am-1 pm", wednesday: "9 am-1 pm", thursday: "9 am-1 pm", friday: "9 am-1 pm", saturday: "Closed", sunday: "9 am-1 pm" },
        place_media: { thumbnail: "https://gtwhi.com.my/soon-tuck-wooi-kwon/", photos: [] }
      },
      {
        place_name: "Ng Fook Tong",
        place_category: "provincial associations",
        place_address: "407, Lebuh Chulia, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3343, 5.4193] },
        place_summary: "Built in 1898, this century-old Cantonese Guild Hall (also known as Ng Fook Thong Temple) originally served as an academy and gathering place for Chinese immigrants. Fun fact: It is one of the rare overseas buildings that functioned as a traditional Chinese academy. Inside, visitors can still find ancient Chinese honor rolls and deep, imposing double-courtyards that exude a dignified, scholarly character.",
        place_information: { rating: 4.4, reviews_count: 20, price_level: "N/A", phone: "+604-261 8620", website: "" },
        place_business_hours: { monday: "9 am–5 pm", tuesday: "9 am–5 pm", wednesday: "9 am–5 pm", thursday: "9 am–5 pm", friday: "9 am–5 pm", saturday: "9 am–5 pm", sunday: "Closed" },
        place_media: { thumbnail: "https://malaysia.news.yahoo.com/ng-fook-thong-temple-secret-230000284.html", photos: [] }
      },
      {
        place_name: "Nam Hooi Wooi Koon",
        place_category: "provincial associations",
        place_address: "463, Lebuh Chulia, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.33364, 5.41925] },
        place_summary: "Founded in 1827 (or 1828), this is the oldest overseas Nanhai Association in the world, serving immigrants from the Nanhai district of Guangdong. The building is exceptionally deep, stretching 200 feet from Chulia Street to Kampung Malabar. Fun fact: Devotees here uniquely pray to the 'White Tiger God' for protection against bad luck, and during specific times of the year, they rub the tiger deity's mouth with a piece of raw lard for good fortune!",
        place_information: { rating: 4.4, reviews_count: 8, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "No Information", tuesday: "No Information", wednesday: "No Information", thursday: "No Information", friday: "No Information", saturday: "No Information", sunday: "No Information" },
        place_media: { thumbnail: "https://malaysia.news.yahoo.com/nam-hooi-wooi-koon-george-230000915.html", photos: [] }
      },
      {
        place_name: "Kwangtung and Tengchow Association",
        place_category: "provincial associations",
        place_address: "50, Lebuh Penang, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.34065, 5.41826] },
        place_summary: "Tracing its roots back to 1795 to manage communal cemeteries, this association acts as an umbrella body for 18 different Guangdong and Fujian organizations. The current headquarters was completed in 1941. Fun fact: Unlike traditional Chinese temples, this building was designed by London-born architect Charles Geoffrey Boutcher in a stout, fortress-like Art Deco style, complete with two flanking towers, just before the Japanese invasion of Penang.",
        place_information: { rating: 4.5, reviews_count: 11, price_level: "N/A", phone: "+6 04-261 0339", website: "" },
        place_business_hours: { monday: "No Information", tuesday: "No Information", wednesday: "No Information", thursday: "No Information", friday: "No Information", saturday: "No Information", sunday: "No Information" },
        place_media: { thumbnail: "https://gtwhi.com.my/kwangtung-and-tengchow-association/", photos: [] }
      },
      {
        place_name: "Kar Yin Fee Kuan (Kar Yin Association)",
        place_category: "provincial associations",
        place_address: "24, King Street, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.34038, 5.41889] },
        place_summary: "Established in the early 1800s, this district association represents Hakka clansmen from the Jiaying (Kar Yin) prefecture in Guangdong province. Fun fact: Kar Yin Hakka immigrants were highly regarded for their skills in traditional Chinese medicine and textiles. Sitting right next to the Tsen Lung Fui Kon, it exemplifies how different Hakka districts clustered closely together for mutual protection and business networking.",
        place_information: { rating: 4.7, reviews_count: 6, price_level: "N/A", phone: "+6 04-261 4652", website: "" },
        place_business_hours: { monday: "9 am-12 pm", tuesday: "9 am-12 pm", wednesday: "9 am-12 pm", thursday: "9 am-12 pm", friday: "9 am-12 pm", saturday: "9 am-12 pm", sunday: "Closed" },
        place_media: { thumbnail: "https://gtwhi.com.my/kar-yin-fee-kuan-kar-yin-association/", photos: [] }
      },
      {
        place_name: "Han Jiang Ancestral Temple",
        place_category: "provincial associations",
        place_address: "127, Lebuh Chulia, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.33814, 5.41669] },
        place_summary: "Formed in 1855 by six Teochew migrants, this stunning temple was completed in 1870. It serves as the community heart for the Penang Teochew Association. Fun fact: The temple boasts a traditional 'four-point gold' (si dian jing) quadrangle design. Because of its meticulous and faithful restoration, it proudly won the prestigious UNESCO Asia-Pacific Heritage Award for Culture Heritage Conservation in 2006.",
        place_information: { rating: 4.3, reviews_count: 102, price_level: "N/A", phone: "+60 4-262 5629", website: "" },
        place_business_hours: { monday: "8.30 am-4.30 pm", tuesday: "8.30 am-4.30 pm", wednesday: "8.30 am-4.30 pm", thursday: "8.30 am-4.30 pm", friday: "8.30 am-4.30 pm", saturday: "8.30 am-4.30 pm", sunday: "8.30 am-12.30 pm" },
        place_media: { thumbnail: "https://timesofindia.indiatimes.com/travel/penang/travel-guide/han-jiang-ancestral-temple/gs59034163.cms", photos: [] }
      },
      {
        place_name: "Eng Tai Hooi Kuan (Yong Da Guan)",
        place_category: "provincial associations",
        place_address: "Lorong Toh Aka, George Town, 10450, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.33659, 5.41302] },
        place_summary: "Founded in 1840, this association (also known as Yong Da Guan) represents the Hakka dialect groups originating from Yongding (Eng Teng) and Dabu (Tai Pu) counties in China. Fun fact: The Hakka people from these regions were famous for their unique earthen roundhouses (Tulou) back in China. In Penang, they established this association to maintain their distinct cultural identity and provide mutual aid to newly arrived Hakka traders and laborers.",
        place_information: { rating: 0, reviews_count: 0, price_level: "N/A", phone: "", website: "" },
        place_business_hours: { monday: "No Information", tuesday: "No Information", wednesday: "No Information", thursday: "No Information", friday: "No Information", saturday: "No Information", sunday: "No Information" },
        place_media: { thumbnail: "https://gtwhi.com.my/eng-tai-hooi-kuan-yong-da-guan/", photos: [] }
      },
      {
        place_name: "Chung San Wooi Koon",
        place_category: "provincial associations",
        place_address: "30, King Street, 10200 George Town, Penang, Malaysia",
        place_location: { type: "Point", coordinates: [100.3401, 5.4185] },
        place_summary: "Established in the late 19th century, this historic cultural landmark is deeply rooted in Penang's Chinese community, specifically serving those who trace their ancestry to Zhongshan in Guangdong. Fun fact: Zhongshan is the birthplace of Dr. Sun Yat-sen, the founding father of the Republic of China. Associations like this played a pivotal role in the early 20th century by discreetly supporting his revolutionary activities and fundraising efforts overseas.",
        place_information: { rating: 4.4, reviews_count: 5, price_level: "N/A", phone: "+604-261 3097", website: "" },
        place_business_hours: { monday: "No Information", tuesday: "No Information", wednesday: "No Information", thursday: "No Information", friday: "No Information", saturday: "No Information", sunday: "No Information" },
        place_media: { thumbnail: "https://gtwhi.com.my/ms/provincial-associations", photos: [] }
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

    console.log("----- 地缘会馆数据同步完成 -----");
    console.log(`总计处理数量: ${placesData.length} 个会馆`);
    console.log(`✅ 全新插入 (New Inserts): ${result.upsertedCount} 个`);
    console.log(`🔄 更新覆盖 (Updates): ${result.modifiedCount} 个`);
    console.log(`(无变动的匹配: ${result.matchedCount - result.modifiedCount} 个)`);
    console.log("--------------------------------");

  } catch (error) {
    console.error("执行时发生错误:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedProvincialAssociations();