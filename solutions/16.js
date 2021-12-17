
const { sum, product, range } = require('../util');

// --

function first(rootPacket) {
  function sumPacketVersions(packet) {
    return packet.version + sum(packet.subpackets?.map((subpacket) =>
      sumPacketVersions(subpacket)
    ));
  }

  return sumPacketVersions(rootPacket);
}

function second(rootPacket) {
  function evaluatePackets(packet) {
    if (packet.literalValue) return packet.literalValue;
    switch (packet.type) {
      case 0:
        return sum(packet.subpackets.map((subpacket) =>
          evaluatePackets(subpacket)
        ));
      case 1:
        return product(packet.subpackets.map((subpacket) =>
          evaluatePackets(subpacket)
        ));
      case 2:
        return Math.min(...packet.subpackets.map((subpacket) =>
          evaluatePackets(subpacket)
        ));
      case 3:
        return Math.max(...packet.subpackets.map((subpacket) =>
          evaluatePackets(subpacket)
        ));
      case 5:
        return evaluatePackets(packet.subpackets[0]) >
          evaluatePackets(packet.subpackets[1])
          ? 1
          : 0
      case 6:
        return evaluatePackets(packet.subpackets[0]) <
          evaluatePackets(packet.subpackets[1])
          ? 1
          : 0
      case 7:
        return evaluatePackets(packet.subpackets[0]) ===
          evaluatePackets(packet.subpackets[1])
          ? 1
          : 0
    }
  }

  return evaluatePackets(rootPacket);
}

function parsePackets(binary) {
  let {
    version,
    type,
    lengthType,
    length,
    rest,
    packet
  } = readHeader(binary);
  let subpackets = [];
  let literalValue;

  if (type === 4) { // Literal
    const bins = [...extractLiteral(rest)];
    rest = rest.slice(bins.length * bins[0].length);

    literalValue = parseInt(
      bins.map((bin) => bin.slice(1)).flat().join(''), 2
    );
    
  } else { // Operator
    if (lengthType === 0) { // Set sub-packet combined length
      while (packet.length > 0) {
        const subpacket = parsePackets(packet);
        subpackets.push(subpacket);
        packet = subpacket.rest;
      }
    } else { // Set amount of sub-packets
      for (_ of range(length)) {
        const subpacket = parsePackets(rest);
        subpackets.push(subpacket);
        rest = subpacket.rest;
      }
    }
  }

  return {
    version,
    type,
    rest,
    literalValue,
    subpackets
  }
}

function readHeader(binary) {
  const version = parseInt(binary.slice(0, 3).join(''), 2);
  const type = parseInt(binary.slice(3, 6).join(''), 2);

  if (type === 4) { // Literal
    const rest = binary.slice(6);
    return { version, type, rest };

  } else { // Operator
    const lengthType = parseInt(binary.slice(6, 7).join(''), 2);

    if (lengthType === 0) {
      const length = parseInt(binary.slice(7, 22).join(''), 2);
      const packet = binary.slice(22, 22 + length);
      const rest = binary.slice(22 + length);

      return { version, type, lengthType, length, rest, packet };
    } else {
      const length = parseInt(binary.slice(7, 18).join(''), 2);
      const rest = binary.slice(18);

      return { version, type, lengthType, length, rest };
    }
  }
}

function* extractLiteral(binary) {
  let numPiece;
  let i = 0;
  do {
    numPiece = binary.slice(i * 5, (i + 1) * 5);
    i++;
    yield numPiece
  } while (numPiece[0] === '1');
}

function format(input) {
  const binary =  input
    .split('')
    .map((val) => parseInt(val, 16).toString(2).padStart(4, 0).split(''))
    .flat();
    
  return parsePackets(binary);
}

// --

module.exports = { 
  first: (input) => first(format(input)),
  second: (input) => second(format(input))
};
