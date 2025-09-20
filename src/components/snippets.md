### Exemplos de Requisição

*cURL (bash):*

```bash
curl -X GET "https://api.mundoaec.com/autosinapi/v1/insumos?q=cimento" \
-H "Authorization: Bearer SUA_CHAVE_DE_API"
```

*Python (requests):*

```python
import requests

headers = {
    'Authorization': 'Bearer SUA_CHAVE_DE_API'
}
params = {
    'q': 'cimento'
}
response = requests.get('https://api.mundoaec.com/autosinapi/v1/insumos', headers=headers, params=params)
print(response.json())
```

*JavaScript (fetch):*

```javascript
fetch('https://api.mundoaec.com/autosinapi/v1/insumos?q=cimento', {
    headers: {
        'Authorization': 'Bearer SUA_CHAVE_DE_API'
    }
})
.then(response => response.json())
.then(data => console.log(data));
```
