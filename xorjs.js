var letterPoints = {

}

// setting = 0: take in a single character and convert it to binary
// setting = 1: take binary and convert back to single character
function bitize(char, setting) {
	var bin = char.charCodeAt(0).toString(2);

	// setting = 0, then return the binary
	if (setting == 0) {
		// make sure all the bits are same length
		while (bin.length != 8) {
			bin = "0" + bin;
		}

		return bin;
	} else {
		// convert to decimal
		var digit = parseInt(char, 2) + "";
		var result = String.fromCharCode(digit);
		return result;
	}	
}

// take in a string and return 8-bit binary digit
// returns an array of 8-bit binary digits
function stringToBitize(str) {
	var final = [];
	var chars = str.split("");

	for (var i = 0; i < chars.length; i++) {
		var temp = bitize(chars[i], 0);
		final.push(temp);
	}

	return final;
}

function bitXOR(in1, in2) {
	if ((in1 == 1) && (in2 == 1)) {
		return 0;
	} else if ((in1 == 0) && (in2 == 1)) {
		return 1;
	} else if ((in1 == 1) && (in2 == 0)) {
		return 1;
	} else {
		return 0;
	}
}

// takes two input arrays, then return an array of the XORd elements
function arrayToXOR(in1, in2) {
	var final = [];

	for (var i = 0; i < in1.length; i++) {
		finalXORWord = "";

		// separate the bits
		var inputBit1 = in1[i].split("");
		var inputBit2 = in2[i].split("");

		// perform bit XOR on them
		for (var j = 0; j < inputBit1.length; j++) {
			var temp = bitXOR(inputBit1[j], inputBit2[j]);
			finalXORWord = finalXORWord + temp;
		}

		final.push(finalXORWord);
	}

	return final;
}

// takes two input string, returns a string of XORd elements 
function stringToXOR(in1, in2) {
	var final = "";

	var inputBit1 = in1.split("");
	var inputBit2 = in2.split("");

	for (var j = 0; j < inputBit1.length; j++) {
		temp = bitXOR(inputBit1[j], inputBit2[j]);
		final = final + temp;
	}

	return final;
}

// takes two arrays (different lengths) and the message to be ciphered
// two input arrays should be bitized
function applyCipher(cipher, message, type) {
	var final = [];
	var temp = message;
	var index = 0;

	var cl = cipher.length;
	var cli = 0;

	var display = [];

	// while message still has elements in it
	while (message.length >= 1) {
		Loop: while (cli < cl) {
			if (message.length == 0) {
				break Loop;
			}

			var t = stringToXOR(cipher[cli], message[0]);

			final.push(t);

			var forDisplay = {};
			forDisplay.cipher = cipher[cli];
			forDisplay.message = message[0];
			forDisplay.stx = t;
			/*var t1 = cipher[cli];
			var t2 = message[0];
			var tmp = [t1, t2, t];*/
			message.shift();
			display.push(forDisplay);

			cli++;
		}

		cli = 0;
	}

	if (type == 0) {
		return final;
	} else {
		return display;
	}
}

// takes bitize array into string
function convertBitArray(rry) {
	var finalString = "";

	for (var i = 0; i < rry.length; i++) {
		var char = bitize(rry[i], 1);
		finalString = finalString + char;
	}

	return finalString;
}

// takes applyCipher array (3 objects) into string
function convertCipherObjectArray(rry) {
	var finalString = "";

	for (var i = 0; i < rry.length; i++) {
		var char = bitize(rry[i].stx, 1);
		finalString = finalString + char;
	}

	return finalString;
}

// get an array of bits, convert to hex, then return a string
function convertBitArrayHex(rry) {
	var finalString = "";

	for (var i = 0; i < rry.length; i++) {
		var temp = binToHex(rry[i], 0);
		finalString = finalString + temp;
	}

	return finalString;
}


function tablize(rry, len) {
	//console.log(rry);
	var table = "";

	var ciplen = len;
	var cipind = 0;

	table = table + '<table id="tble" class="main" style="table-layout: fixed;">';
	table =	table + '<tr>';
		table =	table + '<td class="header">Cipher<br>Char</td>';
		table =	table + '<td class="header">Cipher<br>Bits</td>';
		table =	table + '<td class="header">Message<br>Char</td>';
		table =	table + '<td class="header">Message<br>Bits</td>';
		table =	table + '<td class="header">Result<br>Char</td>';
		table =	table + '<td class="header">Result<br>Bits</td>';
	table =	table + '</tr>';

	var lastCp = ""; //last cipher
	var lastDs = ""; //last description
	var lastRs = ""; //last result
	for (var i = 0; i < rry.length; i++) {
		var bicip = rry[i].cipher;
		var bimsg = rry[i].message;
		var bires = rry[i].stx;

		var chcip = bitize(rry[i].cipher, 1);
		var chmsg = bitize(rry[i].message, 1);
		var chres = bitize(rry[i].stx, 1);

		if (cipind == (ciplen - 1)) {
			table = table + '<tr style="border-bottom: 2px solid black" class="main">';
			cipind = 0;
		} else {
			table = table + '<tr class="main">';
			cipind++;
		}
			table = table + "<td><b>\" " + chcip + " \"</b></td>";
			table = table + '<td class="bits rightbor"><b>'	 + bicip + " </b></td>";
			table = table + "<td><b>\" " + chmsg + " \"</b></td>";
			table = table + '<td class="bits rightbor"><b>' + bimsg + " </b></td>";
			table = table + "<td><b>\" " + chres + " \"</b></td>";
			table = table + '<td><b>' + bires + " </b></td>";
		table = table + "</tr>";

		lastCp = bicip;
		lastDs = bimsg;
		lastRs = bires;
		
	}

	table = table + "</table>";
	var returnObj = {};
	returnObj.table = table;
	returnObj.lastCipher = lastCp;
	returnObj.lastMessage = lastDs;
	returnObj.lastResult = lastRs;

	return returnObj;
	
}

// 1 binary string to hex
function binToHex(char, status) {
	var binary = parseInt(char);
	var hex = "";
	hex = parseInt(binary, 2).toString(16).toUpperCase();
	if ((hex.length == 1) && (status == 0)) {
		hex = "0" + hex;
	}

	return hex;
}

// 1 hex to 1 binary string
function hexToBin(char) {
	// get each individual character of hex
	char = char.toUpperCase();
	var chars = char.split("");
	var result = "";

	for (var i = 0; i < chars.length; i++) {
		if (chars[i] == "0") {result = result + "0000"; }
		else if (chars[i] == "0") {result = result + "0000"; }
		else if (chars[i] == "1") {result = result + "0001"; }
		else if (chars[i] == "2") {result = result + "0010"; }
		else if (chars[i] == "3") {result = result + "0011"; }
		else if (chars[i] == "4") {result = result + "0100"; }
		else if (chars[i] == "5") {result = result + "0101"; }
		else if (chars[i] == "6") {result = result + "0110"; }
		else if (chars[i] == "7") {result = result + "0111"; }
		else if (chars[i] == "8") {result = result + "1000"; }
		else if (chars[i] == "9") {result = result + "1001"; }
		else if (chars[i] == "A") {result = result + "1010"; }
		else if (chars[i] == "B") {result = result + "1011"; }
		else if (chars[i] == "C") {result = result + "1100"; }
		else if (chars[i] == "D") {result = result + "1101"; }
		else if (chars[i] == "E") {result = result + "1110"; }
		else if (chars[i] == "F") {result = result + "1111"; }
	}

	// remove the 8th character because only 7-bits are used
	return result;
}

// 1 hex string to decimal integer
function hexToDec(char) {
	// get each individual character of hex
	char = char.toUpperCase();
	var chars = char.split("");
	var result = 0;

	for (var i = 0; i < chars.length; i++) {
		if (chars[i] == "0") {result = result + 0; }
		else if (chars[i] == "0") {result = result + 0; }
		else if (chars[i] == "1") {result = result + 1; }
		else if (chars[i] == "2") {result = result + 2; }
		else if (chars[i] == "3") {result = result + 3; }
		else if (chars[i] == "4") {result = result + 4; }
		else if (chars[i] == "5") {result = result + 5; }
		else if (chars[i] == "6") {result = result + 6; }
		else if (chars[i] == "7") {result = result + 7; }
		else if (chars[i] == "8") {result = result + 8; }
		else if (chars[i] == "9") {result = result + 9; }
		else if (chars[i] == "A") {result = result + 10; }
		else if (chars[i] == "B") {result = result + 11; }
		else if (chars[i] == "C") {result = result + 12; }
		else if (chars[i] == "D") {result = result + 13; }
		else if (chars[i] == "E") {result = result + 14; }
		else if (chars[i] == "F") {result = result + 15; }
	}

	// remove the 8th character because only 7-bits are used
	return result;
}

// array of binary strings to hex
	// if type == 0, return array
	// if type == 1, return string
function arrayBinToHex(rry, type) {
	var final = [];
	var strFinal = "";

	for (var i = 0; i < rry.length; i++) {
		var temp = binToHex(rry[i], 0);
		final.push(temp);

		if (strFinal.length == 0) {
			var strFinal = temp;
		} else {
			var strFinal = strFinal + temp;
		}
	}

	if (type == 0) {
		return final;
	} else {
		return strFinal;
	}
	
}

// take a string of binary and return a string of hex
function stringBinToHex(str) {
	// split it into chunks of four characters each
	var result = "";
	for (var i = 0; i < str.length; i += 4) {
	    var temp = str.substring(i, i + 4);
	    temp = binToHex(temp, 1);
	    result = result + temp;
	}

	return result;
}

// get array of hexadecimal characters and convert to an array of binary
function arrayHexToBin(rry) {
	var final = [];

	for (var i = 0; i < rry.length; i++) {
		var temp = hexToBin(rry[i], 0);
		if (temp != "") {
			final.push(temp);
			console.log("L: " + temp.length);
		}
	}

	return final;
}

// get array of hexadecimal characters and convert to an array of binary
function arrayHexToBin2(rry) {
	var final = [];

	for (var i = 0; i < rry.length-1; i++) {
		var temp = hexToBin(rry[i], 0) + hexToBin(rry[i+1], 0);
		if (temp != "") {
			final.push(temp);
		}
	}

	return final;
}



// SOLVE ENCRYPTHION
var letterProbs = {
	"A" : 8.167,
	"B" : 1.492,
	"C" : 2.782,
	"D" : 4.253,
	"E" : 12.702,
	"F" : 2.228,
	"G" : 2.015,
	"H" : 6.094,
	"I" : 6.966,
	"J" : 0.153,
	"K" : 0.772,
	"L" : 4.025,
	"M" : 2.406,
	"N" : 6.749,
	"O" : 7.507,
	"P" : 1.929,
	"Q" : 0.095,
	"R" : 5.987,
	"S" : 6.327,
	"T" : 9.056,
	"U" : 2.758,
	"V" : 0.978,
	"W" : 2.360,
	"X" : 0.150,
	"Y" : 1.974,
	"Z" : 0.074
};

// get two letters in bits and return points (integer)
function getPointLetter(lt1, lt2) {
	// in binary
	var bitL1 = bitize(lt1, 0);
	var bitL2 = bitize(lt2, 0);

	console.log("L1: " + bitL1 + ", L2: " + bitL2);
	var str = stringToXOR(bitL1, bitL2);
	console.log(str);

	var newStr = bitize(str, 1);
	
	return letterProbs[newStr];
}

// gets a string, returns an array
function getUniqueLetters(str) {
	/* returns the size/length of an object */
	Object.size = function(obj) {
		var size = 0;
		for(key in obj) {
			if(obj.hasOwnProperty(key)) size++;
		}
		return size;
	}

	//initial vars
	var letters = new Object;

	//loop, figure it out
	for(x = 0, length = str.length; x < length; x++) {
		var l = str.charAt(x)
		letters[l] = (isNaN(letters[l]) ? 1 : letters[l] + 1);
	}

	return letters;
}

// get an array of getUniqueLetters array, and return the highest key
function getOrdered(rry) {
	var keys = [];
	var highest = 0;
	var hkey = '';

	// get a list of all the keys
	for (key in rry) {
		keys.push(key);
	}

	//console.log(keys);

	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		//console.log("Key: " + key);
		if (rry[key] > highest) {
			highest = rry[key];
			hkey = keys[i];
			//console.log(hkey + " is highest with " + highest);
		}
	}

	return hkey;
}