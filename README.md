# Digital Public Goods List

## Overview

* The Digital Public Goods List is a collection of open software, open data, open content, and open AI systems that have been recognized by the Digital Public Goods Alliance as meeting the requirements of the DPG Standard.
* You can see the online list in [DPG Registry](https://www.digitalpublicgoods.net/registry).

## How to make CSV from the latest data

### Environment

* curl: to get json from DPG API, https://app.digitalpublicgoods.net/api/v1/dpgs
* jq: to reformat json data and convert json to csv
* node: to add SDGs matrix in json data

### shell commands

```sh
curl -s https://app.digitalpublicgoods.net/api/v1/dpgs | jq '[.[] | {dpgId: .dpgId, status: .status, name: .name, category: .category, originCountry: (.originCountry // ""), ownerName: (.ownerName // ""), openLicense: (if .openLicense then (.openLicense | join(",")) else "" end), sdgs: ([.sdgs[].number] | join(",")), logo: .logo, sourceURL: .sourceURL, description: (.description | gsub("[\\n\\r]"; " "))}]' | node add_sdgs_matrix.js | jq -r '["dpgId","status","name","category","originCountry","ownerName","openLicense","sourceURL","description","sdgs","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","logo"] as $cols | (["# Digital Public Goods (DPG) List"] | @csv), (["# Public Domain; referring to the DPG Registry API,  https://app.digitalpublicgoods.net/api/v1/dpgs at " + (now | todate)] | @csv), ($cols | ($cols[0]="#") | @csv), (.[] | [.[$cols[]]] | @csv)' > digital-public-goods-list.csv
```

## License

* Public Domain
