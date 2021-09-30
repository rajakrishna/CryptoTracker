import React from "react";
/* Millify: Converts long numbers into pretty, human-readable strings 
   2000 to'2K', 10000 to '10k' and so on
*/
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News } from "../components";
import Loader from "./Loader";

const { Title } = Typography;

const Homepage = () => {
	const { data, isFetching } = useGetCryptosQuery(10);
	console.log("🚀 ~ file: Homepage.jsx ~ line 12 ~ Homepage ~ data", data);
	/* What is  "?." 
	    It is like Optional chaining but instead of causing an error if a reference is 
		nullish (null or undefined), the expression short-circuits with a return value of undefined.
	 */
	const globalStats = data?.data?.stats;

	if (isFetching) return <Loader />;

	return (
		<>
			<Title level={2} className="heading">
				Global Crypto Stats
			</Title>
			<Row>
				<Col span={12}>
					<Statistic title="Total Cryptocurrencies" value={globalStats.total} />
				</Col>
				<Col span={12}>
					<Statistic
						title="Total Exchanges"
						value={millify(globalStats.totalExchanges)}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title="Total Market cap"
						value={millify(globalStats.totalMarketCap)}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title="Total 24hr volume"
						value={millify(globalStats.total24hVolume)}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title="Total Market"
						value={millify(globalStats.totalMarkets)}
					/>
				</Col>
			</Row>
			<div className="home-heading-container">
				<Title level={2} className="home-title">
					Top 10 Cryptocurrencies in the world
				</Title>
				<Title level={3} className="show-more">
					<Link to="/cryptocurrencies">Show More</Link>
				</Title>
			</div>
			<Cryptocurrencies simplified />
			<div className="home-heading-container">
				<Title level={2} className="home-title">
					Latest Crypto News
				</Title>
				<Title level={3} className="show-more">
					<Link to="/news">Show More</Link>
				</Title>
			</div>
			<News simplified />
		</>
	);
};

export default Homepage;
