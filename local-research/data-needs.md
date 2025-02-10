# Additional Data Sources Research

## Available Through Web Interface (Manual Download Required)

### Direct Food Additives (US)
- **Source**: FDA "Everything Added to Food in the United States" (EAFUS)
- **URL**: https://www.cfsanappsexternal.fda.gov/scripts/fdcc/?set=FoodSubstances
- **Access Method**: 
  1. Visit the URL
  2. Select "Download XML/CSV" option
  3. Save to `data/raw/us/direct-additives.csv`

### Cancer Statistics
- **Source**: IARC WHO Cancer Today
- **URL**: https://gco.iarc.fr/today/home
- **Access Method**:
  1. Visit the URL
  2. Select region (US/EU)
  3. Download data tables
  4. Save to `data/raw/who/cancer-stats.csv`

### EU Scientific Opinions
- **Source**: EFSA Journal
- **URL**: https://efsa.onlinelibrary.wiley.com/journal/18314732
- **Access Method**:
  1. Use advanced search for "food additives"
  2. Export search results
  3. Save to `data/raw/eu/scientific-opinions.csv`

## Requires API Registration

### WHO GEMS/Food Consumption Database
- **Requirements**: WHO API key
- **Registration**: https://www.who.int/data/gho/info/gho-odata-api
- **Notes**: 
  - Free for research purposes
  - Need to submit application

### EU Transparency Register
- **Requirements**: EU API credentials
- **Registration**: https://ec.europa.eu/transparencyregister/public/ri/registering.do
- **Notes**:
  - Public data but API needs authentication
  - Bulk download available monthly

## Alternative Approaches

1. **Direct Food Additives**:
   - Use FDA's public datasets portal
   - Download pre-compiled lists
   - Focus on recent updates only

2. **Cancer Statistics**:
   - Use WHO's general health statistics
   - Focus on digestive system cancers
   - Use country-level health reports

3. **Scientific Opinions**:
   - Use public summaries
   - Focus on major decisions
   - Track through press releases

## Next Steps
1. Start with manual downloads of FDA and IARC data
2. Apply for WHO API access
3. Use alternative sources while waiting for API access
4. Consider focusing analysis on publicly available data first

## Notes
- Most APIs require authentication
- Manual downloads available for critical data
- Consider using web scraping as last resort
- Focus on public datasets initially 