<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Transfermodel extends CI_Model {

	public $nodeUrl = "http://192.168.1.11:5005/api/";

	public function connectToPOSTNode($endpoint,$valarr)
	{
		$data = $valarr;                                                                     
		$data_string = json_encode($data); 

		$passUrl = $this->nodeUrl.$endpoint;
		$ch = curl_init($passUrl);                                                                      
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                                                  
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);                                                                     
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
		'Content-Type: application/json',                                                                                
		'Content-Length: ' . strlen($data_string))                                                                       
		);                                                                                                                   

		return $result = curl_exec($ch);
	}

	public function connectToGetNode($endpoint,$valarr)
	{
		                                                                  
		$data = $valarr;
		$data_string = json_encode($data);                                                                               
		
	
		$passUrl = $this->nodeUrl.$endpoint;

		$ch = curl_init($passUrl);      

		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");                                                                     
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                                                  
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);                                                                    
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
		'Content-Type: application/json',                                                                                
		'Content-Length: ' . strlen($data_string))                                                                       
		);                                                                                                                   

		return $result = curl_exec($ch);		 
	}

}