export const rolesAuthorityAbi = [{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"contract Authority","name":"_authority","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"contract Authority","name":"newAuthority","type":"address"}],"name":"AuthorityUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"target","type":"address"},{"indexed":true,"internalType":"bytes4","name":"functionSig","type":"bytes4"},{"indexed":false,"internalType":"bool","name":"enabled","type":"bool"}],"name":"PublicCapabilityUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint8","name":"role","type":"uint8"},{"indexed":true,"internalType":"address","name":"target","type":"address"},{"indexed":true,"internalType":"bytes4","name":"functionSig","type":"bytes4"},{"indexed":false,"internalType":"bool","name":"enabled","type":"bool"}],"name":"RoleCapabilityUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint8","name":"role","type":"uint8"},{"indexed":false,"internalType":"bool","name":"enabled","type":"bool"}],"name":"UserRoleUpdated","type":"event"},{"inputs":[],"name":"authority","outputs":[{"internalType":"contract Authority","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"target","type":"address"},{"internalType":"bytes4","name":"functionSig","type":"bytes4"}],"name":"canCall","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"role","type":"uint8"},{"internalType":"address","name":"target","type":"address"},{"internalType":"bytes4","name":"functionSig","type":"bytes4"}],"name":"doesRoleHaveCapability","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint8","name":"role","type":"uint8"}],"name":"doesUserHaveRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"bytes4","name":"","type":"bytes4"}],"name":"getRolesWithCapability","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"getUserRoles","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"bytes4","name":"","type":"bytes4"}],"name":"isCapabilityPublic","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract Authority","name":"newAuthority","type":"address"}],"name":"setAuthority","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"target","type":"address"},{"internalType":"bytes4","name":"functionSig","type":"bytes4"},{"internalType":"bool","name":"enabled","type":"bool"}],"name":"setPublicCapability","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"role","type":"uint8"},{"internalType":"address","name":"target","type":"address"},{"internalType":"bytes4","name":"functionSig","type":"bytes4"},{"internalType":"bool","name":"enabled","type":"bool"}],"name":"setRoleCapability","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint8","name":"role","type":"uint8"},{"internalType":"bool","name":"enabled","type":"bool"}],"name":"setUserRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}] as const;