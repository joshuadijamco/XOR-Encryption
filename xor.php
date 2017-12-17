<html>
<head>
	<title>XOR Cipher</title>
	<link rel="stylesheet" href="theme.css">
	<script src="xorjs.js"></script>
	<link rel="shortcut icon" href="logo.png" />
</head>
<body>
	<!-- 1ST ROW -->
	<div id="topWrapper">
		<div id="topSection">
			<h1>XOR Cipher</h1>
			To encrypt your plaintext message, enter the text into the Message box.<br>
			To change the cipher, change the plaintext.<br>
			<br>
		<div id="topLeft">
			<form method="post" name="update" action="xor.php">
				Your message: <br>
				<textarea name="message" class="inputText" id="yourMessage" style="width: 100%; height: 20%;" onkeyup="messageEdited()" onfocus="messageEdited()" placeholder="Text to Encrypt (plaintext)" autofocus></textarea>
				<textarea class="inputText hexText" id="messageHex" style="width: 100%; height: 15%; font-family: Courier;" placeholder="Text to Decrypt (hexadecimal)" onkeyup="hexEdited()" onfocus="hexEdited()"></textarea>
				<br><br>
				Your cipher (<span id="ciphertip">Single Byte</span>):<br><input type="text" class="inputText" id="cipherID" name="cipher" style="width: 100%;" value="M" onkeyup="messageEdited()" onfocus="messageEdited()">
				<input type="text" class="inputText hexText" id="cipherIDHex" name="cipher" style="width: 100%; font-family:Courier; background-color: rgba(255,255,255,0.5); font-size: 15px;" readonly>
				<br><br>
				<!--<input id="styled" type="submit">-->
			</form>
		</div> <!-- for top left -->

		<div id="topRight">
			<h1>Last Character</h1>
			<table class="lastChar">
				<tr>
					<td class="lastCharTD">Message: </td>
					<td><span id="lastMessage" class="courier"></span></td>
				</tr>
				<tr style="border-bottom: 2px solid black;">
					<td class="lastCharTD">Cipher: </td>
					<td><span id="lastCipher" class="courier"></span></td>
				</tr>
				<tr>
					<td class="lastCharTD"><b>Result:</b> </td>
					<td><span id="lastResult" class="courier"></span></td>
				</tr>
			</table>
			<br><br>
			<h1>Cipher Length</h1>
			Single byte limits the length of the cipher
			<br><br>
			<label><input type="checkbox" id="sbyte" onclick="messageEdited()" checked> Single Byte</label>
		</div> <!-- for top right -->

		</div>
	</div>


	<!-- 2ND ROW -->
	<div id="bottomWrapper">
		<div id="bottomSection">
			<h1>Result:</h1>
			<textarea class="inputText" id="JSResult" style="width: 100%; height: 25%; font-family: courier;" placeholder="Encrypted Message (hexadecimal)"></textarea>
			<textarea class="inputText hexText" id="JSResultEng" style="width: 100%; height: 18%;" placeholder="Decrypted Message (English)" readonly></textarea>
			<br><br><br>
			<h1>Breakdown:</h1><br>
				<div id="table">
					<!-- contents -->
				</div>
			<br><br><br>
		</div>
	</div>

	<!-- 3RD ROW -->
	<!--<div id="botterWrapper">
		<div id="bottomSection">
			<h1>Decrypt Message</h1>
			<textarea class="inputText" id="dct_message" style="width: 100%; height: 25%; font-family: courier;" placeholder="Encrypted Message (hexadecimal)" onkeyup="dectDecryption()"></textarea>
		</div>
	</div>-->
				<script type="text/javascript">
					var tst = getUniqueLetters("Hello there!");
					console.log(tst);
					var tst2 = getOrdered(tst);
					console.log(tst2);

					// globalTable is used for the table
					var globalTable;

					// if message textarea and cipher textarea changed
					function messageEdited() {
						// where you put English characters message
						var input = document.getElementById("yourMessage");
						var hexInput = document.getElementById("messageHex");

						// where you put English characters cipher
						var cipher = document.getElementById("cipherID");
						var cipherInput = document.getElementById("cipherIDHex");

						// The ciphered cnrypted results in english
						var output = document.getElementById("JSResult");
						var resultInput = document.getElementById("JSResultEng");

						// MONITOR THE LENGTH:
						if (document.getElementById("sbyte").checked) {
							cipher.value = cipher.value.substring(0,1);
							document.getElementById("ciphertip").innerHTML = "Single Byte";
						} else {
							document.getElementById("ciphertip").innerHTML = "Multi Byte";
						}
						// -------------------

						if (cipher.value.length > 0) {
							var newInput = applyCipher(stringToBitize(cipher.value), stringToBitize(input.value), 0);

							// display the hex
							output.value = convertBitArrayHex(newInput);

							var test = applyCipher(stringToBitize(cipher.value), stringToBitize(input.value), 1);
							globalTable = tablize(test, cipher.value.length);
							document.getElementById("table").innerHTML = globalTable.table;
							
							document.getElementById("lastMessage").innerHTML = globalTable.lastMessage + "(" + bitize(globalTable.lastMessage, 1) + ")";
							document.getElementById("lastCipher").innerHTML = globalTable.lastCipher + "(" + bitize(globalTable.lastCipher, 1) + ")";
							document.getElementById("lastResult").innerHTML = globalTable.lastResult + "(0x" + stringBinToHex(globalTable.lastResult) + ")";

							// for hex
							console.log(stringToBitize(input.value));
							//hexInput.value = arrayBinToHex(stringToBitize(input.value), 1);
							cipherInput.value = arrayBinToHex(stringToBitize(cipher.value), 1);
							//resultInput.value = convertBitArray(arrayHexToBin2(output.value), 1);
							
							// -- - - - - -- - - - -- -- ---- --  -- --  - - - -
							// SET ENGLISH OF RESULT
								// split it into chunks of two characters each
								var chunks = [];
								for (var i = 0; i < hexInput.value.length; i += 2) {
								    chunks.push(hexInput.value.substring(i, i + 2));
								}

								// takes from HEX input and then converts to binary
								var hexToBitInput = arrayHexToBin(chunks);
								var test = applyCipher(stringToBitize(cipher.value), hexToBitInput);

								// convert the decrypted text to english
								var english = convertCipherObjectArray(test);
								resultInput.value = english;
							// -- - - - - -- - - - -- -- ---- --  -- --  - - - -
						}
					}

					function hexEdited() {
						// where you put English characters message
						var input = document.getElementById("yourMessage");
						var hexInput = document.getElementById("messageHex");

						// where you put English characters cipher
						var cipher = document.getElementById("cipherID");
						var cipherInput = document.getElementById("cipherIDHex");

						// The ciphered cnrypted results in english
						var output = document.getElementById("JSResult");
						var resultInput = document.getElementById("JSResultEng");

						// split it into chunks of two characters each
						var chunks = [];
						for (var i = 0; i < hexInput.value.length; i += 2) {
						    chunks.push(hexInput.value.substring(i, i + 2));
						}

						var hexInputArray = chunks;

						// converted the hex to binary
						var binInputArray = arrayHexToBin(hexInputArray)
						//input.value = convertBitArray(binInputArray);

						cipherInput.value = arrayBinToHex(stringToBitize(cipher.value), 1); // update cipher hex
						var newInput = applyCipher(stringToBitize(cipher.value), stringToBitize(input.value), 0);
						
						// display the hex
						output.value = convertBitArrayHex(newInput);

						// -- - - - - -- - - - -- -- ---- --  -- --  - - - -
							// SET ENGLISH OF RESULT
							// split it into chunks of two characters each
							var chunks = [];
							for (var i = 0; i < hexInput.value.length; i += 2) {
							    chunks.push(hexInput.value.substring(i, i + 2));
							}

							// takes from HEX input and then converts to binary
							var hexToBitInput = arrayHexToBin(chunks);
							var test = applyCipher(stringToBitize(cipher.value), hexToBitInput);

							// convert the decrypted text to english
							var english = convertCipherObjectArray(test);
							resultInput.value = english;
						// -- - - - - -- - - - -- -- ---- --  -- --  - - - -
					}

					function dectDecryption() {
						var messageBox = document.getElementById("dct_message");

						// convert string in messageBox to binary array
						var binStrip = stringToBitize(messageBox.value);

						// converts binary array to hex, returns an array
						var byteStrip = arrayBinToHex(binStrip, 0);

						var lst = [ 'e','t','a','o','i','n',' ','s','h','r','d','l','u'];
						var allstr = [];


						for (var ii = 0; ii < lst.length; ii++) {
							for (var jj = 0; jj < byteStrip.length; jj++) {
								// get the binary
								var temp = stringToBitize(lst[ii]) + "";
								var ch = stringToXOR(binStrip[jj], temp);

								// convert to english character
								ch = bitize(ch, 1);

								// push english characters to allstr
								allstr.push(ch);
							}
						}

						console.log("ALL START : " + allstr);
						var finstr = allstr.join("");
						console.log(finstr);

						var test = getUniqueLetters(finstr);
						console.log(test);
						/*var count = 0;
						for (var jj = 0; jj < test.length; j++) {
							if (test[jj] > count) {
								count = test
							}
						}*/
					}


				</script>
	<div id="topWrapper">
		<div id="topSection" class="footer">
			<br><br>
			<center>Created by <a href="http://joshuadijamco.com" target="_blank">Joshua Dijamco</a> for an ECE422 presentation<br>
				<b>Last Updated:</b> 21 November 2017<br><br><br><br><br></center>
		</div>
	</div>
</body>
</html>