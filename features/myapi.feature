Feature: Httpbin.org exposes various resources for HTTP request testing As Httpbin client I want to verify that all API resources are working as they should

	Scenario: Setting headers in GET request
		Given I set User-Agent header to apickli
            And I set Content-Type header to application/json 
            And I set Authorization header to "Bearer a2FzaWtvcm5iYW5rdG9rZW4="
            And setting body qr payment request
		When I POST to /v1/qrpayment/request
        Then response code should be 200
            And validate qr response body