CONTENT=$(jq -c . ords_config_service/apispec.json)

oci dbtools-runtime database-api-gateway-config-pool-api-spec create default \
  --database-api-gateway-config-id $CONFIG_OCID \
  --pool-key $POOL_KEY \
  --display-name concert_sample_app_apispec \
  --content "$CONTENT"

oci dbtools-runtime database-api-gateway-config-pool-auto-api-spec create default \
  --database-api-gateway-config-id $CONFIG_OCID \
  --pool-key $POOL_KEY\
  --display-name "The SEARCH_VIEW VIEW" \
  --database-object-name SEARCH_VIEW \
  --database-object-type VIEW \
  --description "This is a rest API of SEARCH_VIEW" \
  --alias "search_view" \
  --from-json '{"operations":["READ"]}'

oci dbtools-runtime database-api-gateway-config-pool-auto-api-spec create default \
  --database-api-gateway-config-id $CONFIG_OCID \
  --pool-key $POOL_KEY\
  --display-name "The SEARCH_ARTIST_VIEW VIEW" \
  --database-object-name SEARCH_ARTIST_VIEW \
  --database-object-type VIEW \
  --description "This is a rest API of SEARCH_ARTIST_VIEW" \
  --alias "search_artist_view" \
  --from-json '{"operations":["READ"]}'

oci dbtools-runtime database-api-gateway-config-pool-auto-api-spec create default \
  --database-api-gateway-config-id $CONFIG_OCID \
  --pool-key $POOL_KEY\
  --display-name "The SEARCH_VENUES_VIEW VIEW" \
  --database-object-name SEARCH_VENUES_VIEW \
  --database-object-type VIEW \
  --description "This is a rest API of SEARCH_VENUES_VIEW" \
  --alias "search_venues_view" \
  --from-json '{"operations":["READ"]}'
