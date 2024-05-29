import * as cheerioFunc from "cheerio";
import * as axiosFunc from "axios";

async function scrapeLeaderboard(url) {
    try {
        const response = await axiosFunc.get(url);
        const $ = cheerioFunc.load(response.data);

        const leaderboard = [];

        $('tbody tr').each((index, element) => {
            const rank = $(element).find('td').eq(0).text().trim();
            const username = $(element).find('td').eq(1).text().trim();
            const score = $(element).find('td').eq(2).text().trim();
            const extra = $(element).find('td').eq(3).text().trim();
            const date = $(element).find('td').eq(4).text().trim();

            leaderboard.push({ rank, username, score, extra, date });
        });

        return leaderboard;
    } catch (error) {
        console.error('Error scraping data:', error);
        return null;
    }
}

module.exports = scrapeLeaderboard;
