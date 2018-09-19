<?php 
		$endPoint   = "ethtoethaddress";	
		$toAddress 	= $_REQUEST['toAddress'];
		$value 		= $_REQUEST['value'];
		$coinwallet = $_REQUEST['coinwallet'];
		$saltkey 	= $_REQUEST['salt'];

	$valarr   			=  array("toAddress" => $toAddress,"value" => $value,"coinwallet" => $coinwallet,"saltkey" => $saltkey);
	$resp 				= $this->transfermodel->connectToPOSTNode($endPoint,$valarr);
	$returnArr["resp"] 	= $resp;

	echo json_encode($returnArr);

?>