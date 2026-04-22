# Permite que o namespace de deploy "pagamentos" leia as imagens do namespace de CI "pagamentos-api-ci"
#
oc policy add-role-to-group system:image-puller system:serviceaccounts:pagamentos -n pagamentos-api-ci

# Permite que o namespace de deploy "checkout" leia as imagens do namespace de CI "checkout-frontend-ci"
oc policy add-role-to-group system:image-puller system:serviceaccounts:checkout -n checkout-frontend-ci
