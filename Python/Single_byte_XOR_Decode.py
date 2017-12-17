
def charXORciph(hexstr):
    byteStrip = [''.join(c) for c in zip(hexstr[0::2], hexstr[1::2])]; #breaking hex string into byte-sized pieces
    lst = [ 'e','t','a','o','i','n',' ','s','h','r','d','l','u',
           'E','T','A','O','I','N','S','H','R','D','L','U'] #most common characters to check
    
    allstr = [];#all XORd letters kept for counting purposes
    for ii in range(len(lst)):
        for jj in range(len(byteStrip)):
            ch = chr(int(byteStrip[jj],16)^ord(lst[ii]));
            allstr.append(ch);
    test = {i:allstr.count(i) for i in allstr} #XOR key will be one with highest value
    count = 0;
    key = '';
    decode = '';
    for jj in test: #this loop extracts most frequent letter (which is the key)
        if test.get(jj) > count:
            count = test.get(jj);
            key = jj;
    for kk in range(len(byteStrip)): #decode our message
        decode = decode+chr(int(byteStrip[kk],16)^ord(key))
    return decode,key;
