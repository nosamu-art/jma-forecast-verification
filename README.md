# JMA Forecast Verification

This project is a statistical processing and data engineering demonstration for objectively verifying and visualizing the accuracy of Japan Meteorological Agency prefectural weather forecasts using observed values from AMeDAS stations.

It aims to build a pipeline that parses JMAXML, the JMA Disaster Prevention Information XML format with a complex hierarchical structure, calculates regional precipitation forecast accuracy, and serves the results as static JSON data for an interactive map-based verification website.

本プロジェクトは、気象庁が発表する「府県天気予報」の精度を、アメダス観測所の実況値を用いて客観的に検証・可視化するための統計処理・データエンジニアリングのデモンストレーションです。

複雑な階層構造を持つ JMAXML（気象庁防災情報XML）をパースし、地域単位での降水適中率を算出するパイプライン（現在はJSONベースの静的配信）の構築、および地図上でのインタラクティブな精度評価の提供を目的としています。

The site displays verification results for the next-day precipitation occurrence forecasts issued at 05:00, 11:00, and 17:00 each day. Results are shown by national summary, regional forecast area, and local forecast area on a map of Japan.

Published site files are under [`docs/`](docs/).

## Data Source

Data Source: JMA Disaster Prevention Information XML History Database (National Institute of Informatics)

This project's verification results are independently calculated and processed by an individual using data from the **JMA Disaster Prevention Information XML History Database provided by the National Institute of Informatics**.

- Weather forecast source: [JMA Disaster Prevention Information XML History Database](https://agora.ex.nii.ac.jp/cps/weather/report/)
- Observations: JMA AMeDAS daily data
- License: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.ja)

## What The Site Shows

The site visualizes precipitation occurrence verification scores for next-day forecasts in the "prefectural weather forecast" bulletins.

- Target issue times: 05:00, 11:00, and 17:00 every day
- Verification window: 00:00 to 24:00 on the day after issuance
- Display levels: national summary, regional forecast area, and local forecast area
- Current scope: precipitation occurrence only
- Temperature verification is not included in the current public site

## Public Site Structure

The GitHub Pages site is a static frontend. It does not require a backend service.

- [`docs/index.html`](docs/index.html): page shell
- [`docs/assets/app.js`](docs/assets/app.js): map, filters, language switching, and rendering logic
- [`docs/assets/style.css`](docs/assets/style.css): visual styling
- [`docs/data/`](docs/data/): generated public JSON data

The public JSON files are generated from parquet outputs by:

```powershell
.\.venv\Scripts\python.exe scripts\build_public_data.py --clean
```

## Methodology

### 1. Precipitation Threshold

This site classifies precipitation status using AMeDAS observations and the following threshold.

- Precipitation present: daily precipitation is 1.0 mm or more
- Precipitation absent: daily precipitation is less than 1.0 mm

Under JMA's standard, snow is treated as precipitation at 0.5 mm or more. This site uses 1.0 mm for all precipitation events because of data acquisition constraints, so the official accuracy values may differ slightly.

### 2. Forecasts And Time Window

The site verifies next-day forecasts in the prefectural weather forecasts issued at the following times.

- Issuance times: 05:00, 11:00, and 17:00 every day
- Verification window: 00:00 to 24:00 on the day after issuance

In addition to JMA's regular verification at 05:00 and 17:00, this site also includes the next-day forecast contained in the 11:00 bulletin for a broader assessment.

### 3. Spatial Aggregation

The accuracy calculation follows JMA's objective verification method.

- Aggregation unit: local forecast area, such as Tokyo or southern Hyogo
- Method: each AMeDAS station within a local forecast area is judged individually, and the results are averaged to obtain the area's accuracy score

This means that if rain falls only in part of a forecast area, the accuracy does not become 100%, which matches lived experience more closely.

## 検証方法

### 1. 降水の有無の判定基準

本サイトでは、アメダス観測所による実況値に基づき、以下のしきい値で「降水の有無」を判定しています。

- 降水あり: 日降水量の観測値が 1.0mm 以上
- 降水なし: 日降水量の観測値が 1.0mm 未満

気象庁の基準では、雪の場合は 0.5mm 以上を降水ありとして扱います。本サイトではデータ取得の制約により、雪を含むすべての降水現象を一律で 1.0mm 以上として判定しているため、公式の適中率とわずかに差が出る場合があります。

### 2. 検証対象とする予報と時間帯

以下のタイミングで発表された「府県天気予報」における、翌日の予報を検証対象としています。

- 対象発表時刻: 毎日 5時、11時、17時
- 検証対象時間帯: 発表日の翌日 0時 〜 24時（24時間）

気象庁の定期検証（5時発表および17時発表）に加え、本サイトでは11時発表の電文に含まれる翌日予報も集計対象に含めることで、より多角的な精度評価を行っています。

### 3. 地点の集計と空間的評価

精度の算出ロジックは、気象庁の公式客観検証手法に準拠しています。

- 集計単位: 一次細分区域（例: 東京地方、兵庫県南部など）
- 算出ロジック: 予報区（一次細分区域）内に含まれる全アメダス観測所（全国約600地点）ごとに個別に適中・不適中を判定し、その結果をエリア内で平均化して、当該予報区の適中率としています

この手法により、予報区の一部だけで雨が降った場合に適中率が100%にならない、生活実感に即した評価になっています。

## Notes

- This site is for demonstration purposes. For disaster prevention decisions, refer to official JMA information.
- This site is a research and development demonstration and is not intended for actions based on its forecast accuracy.
- It is not suitable for decisions related to safety or property protection.
- Accuracy changes over time, and the service may be discontinued without notice.

## 注意事項

- 本サイトはデモンストレーション目的であり、防災上の判断には気象庁の公式情報を参照してください。
- 本サイトは研究・開発用のデモンストレーションであり、この予報精度に基づいた行動を前提としていません。
- 利用者の生命・身体の安全や財産の保護に関する判断を目的とする利用には適しません。防災上の判断には気象庁の公式情報を参照してください。
- 精度は随時変化し、予告なく提供を中止することがあります。

## Author

- Created by: Osamu
- Source Code: [nosamu-art/jma-forecast-verification](https://github.com/nosamu-art/jma-forecast-verification)
- Contact: [linkedin.com/in/osamu-nishimoto-8a687440b](https://www.linkedin.com/in/osamu-nishimoto-8a687440b)
