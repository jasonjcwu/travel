# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)


```
travel
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  └─ master
│  │     └─ remotes
│  │        └─ origin
│  │           └─ master
│  ├─ objects
│  │  ├─ 00
│  │  │  ├─ 74569f229ebf238446b9b27868cd51fc462d94
│  │  │  └─ ffa934d5a142deaf90930f353148523b435a02
│  │  ├─ 03
│  │  │  ├─ 267d932b5351ca10ac2fda1a2b8fffe77f5645
│  │  │  └─ c36e5a36380f30a9cd4b425854a7de237427c0
│  │  ├─ 04
│  │  │  └─ 8132f9e0eb838608dba1fec9377e493180780d
│  │  ├─ 05
│  │  │  ├─ 6a44ca909f7c0b663f3db05a6ee7819986c9f5
│  │  │  └─ 8fc9c307cdc8d8bd354a0dacf00f08af2977b9
│  │  ├─ 06
│  │  │  └─ 69d986a417138806f81974a7fbfde073f9d8bd
│  │  ├─ 07
│  │  │  └─ 840b7400510cf4a1ff5f5dc6a435117f58474a
│  │  ├─ 08
│  │  │  ├─ 853baf12b254cab713f2c52a359421bff220f3
│  │  │  └─ f13b958d18209e023f2a1214931a1c36dcc6e5
│  │  ├─ 09
│  │  │  └─ 77919722037b8b7f0ca4ed3995978785d7cfe8
│  │  ├─ 0a
│  │  │  ├─ 2f2321932742d348bfb042c4b393850cb5af2d
│  │  │  └─ fe5af0deec7099b5f0a67c2a2c34acc725816e
│  │  ├─ 0b
│  │  │  └─ 375339bf2f2721ea41c7597529032b66851a61
│  │  ├─ 0d
│  │  │  ├─ 7cf29d19cccc53bd41946b7256de20f4e61718
│  │  │  └─ 8034e20c584c89b649aa175c4f1ea9dcf48917
│  │  ├─ 0e
│  │  │  ├─ 0de745da001fbe0cbe9c906987e58c4247907e
│  │  │  ├─ 7e676f3104a0b8e168db10d160fde20d2f069c
│  │  │  └─ 82cf80d5f75e82dd3ccb3f4268028e505bab6e
│  │  ├─ 0f
│  │  │  └─ e92ee61305e4bfdc93598433b29e7d8389218e
│  │  ├─ 11
│  │  │  └─ 071e88734ef4cb51196b7ff11dcce2d5746498
│  │  ├─ 12
│  │  │  ├─ 0667cdb19f073bf3cc8c89927a4f9a4cce43be
│  │  │  ├─ 3d53664d5ce574af7195bd6a27aaf53dfa50e0
│  │  │  ├─ 8d1ba1d56b639abff698e8bf9b7fe46fdfac9f
│  │  │  └─ 964eb4f0558ee3868017500e181cfd88c784f4
│  │  ├─ 15
│  │  │  ├─ 27697834f1429fef0b078a65d901969ab79105
│  │  │  └─ 62fbc7c0e125c7cd0bceba8206d3964b6c864b
│  │  ├─ 16
│  │  │  └─ 348ced92c192e7cdb37b4c23ec97c73dc50d15
│  │  ├─ 17
│  │  │  └─ 582e4e030d4f2a417f5353366a1fc033c303bd
│  │  ├─ 18
│  │  │  └─ 6bb888913c1ee628e3d14b9fdddc1cb7254b48
│  │  ├─ 1c
│  │  │  └─ 5f320b2a559310c39867830797454a685eaf44
│  │  ├─ 1d
│  │  │  ├─ 157eea7472efed98e8b0e99b50f7b3a3237f68
│  │  │  └─ bfc7664b39466265a39ab05613409a68711a67
│  │  ├─ 1e
│  │  │  └─ 93638a95bb431bcc42c9f9d1a56d870de57f7b
│  │  ├─ 20
│  │  │  └─ fb3bd6151885bb430918582969817c96da6e7f
│  │  ├─ 26
│  │  │  └─ c9106d802d0d2a254b9f75a1df588410015bf4
│  │  ├─ 27
│  │  │  └─ b2b26d379bc328ebf87b99d643ac2d374e0730
│  │  ├─ 28
│  │  │  └─ 920c7de01280176d2ef3f5dd8010ed7546be86
│  │  ├─ 29
│  │  │  ├─ 4311348435b455eafa743bc304761eb2b2665a
│  │  │  └─ 823ca3ded6d276fd2cb0125624809a4b3bd007
│  │  ├─ 2d
│  │  │  └─ 5b6845ebd182ebbf65b05af1362c90995ce3ac
│  │  ├─ 2e
│  │  │  └─ 485e065b0dadec17983f91822d18117db0c011
│  │  ├─ 2f
│  │  │  └─ 4ff454a123cf3d5f9a8f63e78b205e6e02625a
│  │  ├─ 30
│  │  │  └─ f4dde4042114214c1f2fc8fea456d92b28a6df
│  │  ├─ 31
│  │  │  └─ 936279a591086b37003fddf4897e3ffa2f1694
│  │  ├─ 32
│  │  │  ├─ 1243bb4a92c2f596d685c028c516ed61ca4b5c
│  │  │  ├─ 402c8caacd7f3c649310ce4b1252046823aef7
│  │  │  ├─ da58de4e7effc05789cca7b3a9e57522233c87
│  │  │  └─ e8cfbecda34c8bd5b0e4bfec34d5cc631cb180
│  │  ├─ 34
│  │  │  └─ 02fde486620c2c0d7e74f09a5a5951a078edb7
│  │  ├─ 35
│  │  │  └─ f60d5224b9932409a4e27aece33bba071770ed
│  │  ├─ 38
│  │  │  └─ 8c9b1b56876f31b02b6b05a6ad21e2774544ea
│  │  ├─ 3b
│  │  │  ├─ 3bd105a60ea006c414d18a3b132611cc4968c7
│  │  │  └─ 42f43bc22ed36b06bae76cf106778b3acf4d84
│  │  ├─ 3f
│  │  │  └─ 0232b8e30c794784796ec8ea5f3fc68654f3f3
│  │  ├─ 43
│  │  │  ├─ 2f7ddac8275c3c8c65a35e69a44b29850f06af
│  │  │  ├─ 7877742baebb6f47288c60acb443164587a12f
│  │  │  └─ aa5fcf76e61c4aabef3bb37e539bcac4ad55cf
│  │  ├─ 44
│  │  │  ├─ 0005b33184efa6dd3dc1a9f7b65cd651611d51
│  │  │  └─ 18dd0a504f725bacf6ae69d8fa891fb1de53d4
│  │  ├─ 45
│  │  │  └─ 493a15000b6d0349f9310a2df85ccf4cfa1150
│  │  ├─ 47
│  │  │  └─ 5166c5894d51ed8b2732171ecf5b371707f1ae
│  │  ├─ 49
│  │  │  ├─ d50d90343e8b0460809457b7a2a5054b025671
│  │  │  └─ f17283dd795ae0257b16b260ff8e20bdd01a55
│  │  ├─ 4a
│  │  │  ├─ a490e4c3994d3c3a9641bb8fa5d9dc68bf76fb
│  │  │  └─ cfff429704d8d58a41fc402a85996033423fda
│  │  ├─ 4b
│  │  │  └─ bdfb10a9c959bace4c5c758f0620bebeafa654
│  │  ├─ 4d
│  │  │  └─ e9fac4713f0987fe0c6c4e7b5ed426ed925f28
│  │  ├─ 4f
│  │  │  └─ 8387888868d02c415e1704dd2deda75b1bed7a
│  │  ├─ 53
│  │  │  └─ e2d923798c9d2051928d0490c9a1bb0f75d155
│  │  ├─ 55
│  │  │  └─ ad78611628ebc1cff5c5013a7ac754be95f167
│  │  ├─ 57
│  │  │  └─ f9859c3d7f8510dcbbd076534fdb10c09a28d4
│  │  ├─ 59
│  │  │  ├─ 7fc183f892a1be592a4ff815451650ad54cfc6
│  │  │  └─ 80dc0c6b9a69ae31ed1f905b30bfc47ec76c30
│  │  ├─ 5a
│  │  │  └─ 77414ee1de65244098b2cf8d215547e1318b0e
│  │  ├─ 5b
│  │  │  └─ e5ef7dc07c8bf592ef15085b1dbf3b010e7089
│  │  ├─ 5d
│  │  │  └─ fb025bbddd2cb251e374ed6c95f288e2b66edb
│  │  ├─ 5e
│  │  │  ├─ 28af19de510b07640b2a3ac0c9014a26310f48
│  │  │  ├─ 75606ab24648c55e41ebe487c2255f2981bf2e
│  │  │  └─ cc33e5ad04a5e4399a026f803e506d87b27262
│  │  ├─ 5f
│  │  │  ├─ 9081079418d374273fa340d5964dacbf2e9154
│  │  │  └─ 9909194fbba36ed2786b75b8a960be8458357d
│  │  ├─ 60
│  │  │  └─ 32bfc58d70a2a954172b041f73833ab12d1393
│  │  ├─ 61
│  │  │  └─ 10fe0e3f06339c12773d8f498b207e14f1ef07
│  │  ├─ 62
│  │  │  └─ 7335963a873d3f1bb39d9089f51d88dda88416
│  │  ├─ 63
│  │  │  └─ 9c60513b7801739163bded93abfcc0eee20628
│  │  ├─ 64
│  │  │  └─ 17d4ca69d804f577edf61e1fe90d045eb99361
│  │  ├─ 68
│  │  │  ├─ 04d3892112beaac4abc162eff0257966bc11bb
│  │  │  └─ 184f87e14acf766ffa947c9eba42d2df2af756
│  │  ├─ 69
│  │  │  └─ 2e3365b50c7cba31d9630811d37bc51c040fa2
│  │  ├─ 6b
│  │  │  └─ 497cedca657dfe02d12b199733dc1c872bcf9a
│  │  ├─ 6c
│  │  │  ├─ 05d92d1442e6c7b161e279f8c6eb9b236e0b8a
│  │  │  └─ a308941f07afd50ea7604a3af8c7ddc7710320
│  │  ├─ 6e
│  │  │  └─ 8e3a770d47654afeb883d55e5d7f38f46bdf72
│  │  ├─ 6f
│  │  │  └─ b3d8e2a11511457090e8351919ccf387a20cfa
│  │  ├─ 74
│  │  │  └─ c67b81cc17579ba0be12cb92ce30c9dbd27221
│  │  ├─ 76
│  │  │  ├─ 2c0d7bd6d74f3c4008e210ce53b2ea0b2391ef
│  │  │  ├─ 3978ef52ce95cddf2ce8a981e0ae534bf1f457
│  │  │  └─ 99e7b22960072d192bb8dbc0adaa28ad2ffcbd
│  │  ├─ 79
│  │  │  └─ bf202b2edf21af18039de270bf23a7370a4e35
│  │  ├─ 7a
│  │  │  └─ 857b0c81396bd9e13bfcc38ea5d44249a6e31e
│  │  ├─ 7b
│  │  │  └─ c094adba2531072be483d01873d07a51cdf680
│  │  ├─ 7c
│  │  │  ├─ 68afaa1c497bb45d89162331a99b9ddf1ba55d
│  │  │  └─ 8e318cbb41093d2aa87f560880b86ac111d037
│  │  ├─ 7d
│  │  │  └─ 9ee3b042864c6fb8d6145281bb80a43de75d13
│  │  ├─ 7e
│  │  │  └─ 7ec0e3bd7be85f43ff221a2a5181dec38a6a84
│  │  ├─ 7f
│  │  │  └─ c7f2028550a3d54756ccb2ac9c65ccc76f5cc6
│  │  ├─ 81
│  │  │  └─ 7d1dcd81f4411fffbddac8f9e99b437e022b85
│  │  ├─ 84
│  │  │  └─ 9c77b6908d70932d964a5b869c5e6715f18916
│  │  ├─ 85
│  │  │  ├─ 045aef6a13e27a7bedc8d2624a683b10721c12
│  │  │  └─ 21ce181bb0bf24ffddf0561ddc34a9364c6b16
│  │  ├─ 86
│  │  │  └─ e7aff57ae05fb7c261c2d167db3d27ef7d7dc2
│  │  ├─ 88
│  │  │  ├─ 2b91fcfac664def698c11216e121043d7d1fa5
│  │  │  ├─ 35af0699ccec004cbe685ef938cd2d63ea7037
│  │  │  └─ d15f18bd31491841fddb1f97884cc521234a81
│  │  ├─ 89
│  │  │  ├─ 3118f8ed4f9affb4924d848cd3dcfb0336e895
│  │  │  ├─ 5741ea6db851eff0640be9544786498d43e5bc
│  │  │  └─ d28d51939d2cab8e828d60dd344a8c73a5fcec
│  │  ├─ 8c
│  │  │  └─ cb2fe260cd2fe7a705099800a54bc5adc82ecb
│  │  ├─ 8d
│  │  │  └─ 9fce430068d0c3bafb831992344a6456ca71a8
│  │  ├─ 8e
│  │  │  └─ 225df87d7d0efcd13b2cbb4b7b18b0221eba19
│  │  ├─ 92
│  │  │  └─ 4a6f78b27fbaeb5f46bd1923666a5bf8401187
│  │  ├─ 93
│  │  │  └─ 8fa1b24a4a22c464962be85836e9b1178496bb
│  │  ├─ 95
│  │  │  ├─ b1adaeafdd220d0dba171037cd6bb9e0df6ef0
│  │  │  └─ b27e441317a0a5cc5145c1117bb1ce55cc99bd
│  │  ├─ 96
│  │  │  ├─ 4f87ebff9efdeec5e5fbf8c567361032ac7eaa
│  │  │  ├─ 7984df8049512c735fb434ccd68572b39d6227
│  │  │  └─ 9e42a48cfd99eae8dd4066d845fcbfad88e861
│  │  ├─ 98
│  │  │  └─ 2da5dbf898066d67a195aebee3790722b0359a
│  │  ├─ 99
│  │  │  └─ 4906fd4ea06ec54a5b6baa23fa891d1a97f3b0
│  │  ├─ 9a
│  │  │  └─ 1c881cb8d8f14c12c2460c26273675b9b78d9e
│  │  ├─ 9b
│  │  │  ├─ f21ed91d0daee4d524a5e838b0a23dc1a2ec48
│  │  │  └─ f5a7dd8c3b1d0575fe43ff0127f8260ecb253e
│  │  ├─ 9c
│  │  │  └─ 8534da8d71ad1f2eca62f46a341bfea9439c77
│  │  ├─ 9e
│  │  │  ├─ 712da32ad3d40f984c870bf7ad4de98439c40d
│  │  │  └─ 79271cb655a2edcfd8886046acb0de8df532ba
│  │  ├─ 9f
│  │  │  ├─ 43d20e4c351a7fcd5767dfd44486f916611269
│  │  │  └─ c0503c39670b9a0ea95f7142ead1fbb2c8cad9
│  │  ├─ a1
│  │  │  ├─ 392df5b3deac86eb831d94257362aeab3f5c1f
│  │  │  └─ c3cd76b7c48732b38753dc9d0c3caae1ce7a84
│  │  ├─ a2
│  │  │  ├─ 5cca83af1a4826c7b0ab4a078fbf921d649fdc
│  │  │  └─ e08f9fbab465bc968eac02083733cda2f64344
│  │  ├─ a4
│  │  │  └─ 3a24581be1a7a6409a8515f20f20bf4120499a
│  │  ├─ a7
│  │  │  ├─ 8ad8b9fb842d01f6bb0d9a894142e47aa822a7
│  │  │  └─ d964ab0e9ae422c3f7a7e1df46a5e076242680
│  │  ├─ a8
│  │  │  └─ 61999d8c909092c3155ea96a9eda6e57ddb782
│  │  ├─ aa
│  │  │  └─ 3a9ed6449accc686ccfd9c88353a441e5fc365
│  │  ├─ ab
│  │  │  └─ abc70d552a8c00b726b400353f0a446b7409ef
│  │  ├─ ac
│  │  │  └─ 85ddc29f1562aba1085dec5f85c178a20dfe8f
│  │  ├─ ad
│  │  │  ├─ e4fa72a6db163734c3643d4e66b1016e085dde
│  │  │  ├─ eec16b3cd4e7e639320191d4867241b828b2f2
│  │  │  └─ fe58bdb249588e11ffb83a74f2b49de94a44a2
│  │  ├─ ae
│  │  │  ├─ 4d078c53b72a7ea1a2c11ce00cbb28d2f54e5b
│  │  │  ├─ 5827924abf07f76e31b81cf6827e078fda857c
│  │  │  └─ a87a47cad63a0bca7ede2648cfdebdafc2cd41
│  │  ├─ af
│  │  │  └─ 194ba2eb2a606b330d5aeb989415386762e8d0
│  │  ├─ b0
│  │  │  └─ 47a5b512d3ab2d8a66b7109ca7bed2742bab67
│  │  ├─ b3
│  │  │  └─ a5dc1142dfd0e217cd7f937330c305521389fa
│  │  ├─ b4
│  │  │  ├─ b8dfae171651e3b38d4f862184dcaa21fe3296
│  │  │  └─ d98d66cecfb434450817074d08c257a9d1d65a
│  │  ├─ b6
│  │  │  └─ 5607dba74ab70f74dd77888a8692f038ce3b12
│  │  ├─ b7
│  │  │  └─ 7cbeed1663620931ed46aab2efb9ecafabca98
│  │  ├─ ba
│  │  │  └─ 186e01cd1fb09d6dbf8ac36fd9f226aebbe2b1
│  │  ├─ be
│  │  │  └─ 4cfe84ec589f88c33aa9054f9b1cfcb88ed4e8
│  │  ├─ bf
│  │  │  └─ d3cbb360579829382576ef0f724333977a7047
│  │  ├─ c0
│  │  │  └─ 01233431f5917c1df3d98bb4c61f5b0f132aee
│  │  ├─ c3
│  │  │  ├─ 8e10b6386f6d4e44b1c069733632cbb20b6da8
│  │  │  ├─ 9809f72b7bc071a47206e426eb4fa0514f9fe0
│  │  │  └─ f7b7738361b112e8fa07637ac3dd86bfa8d0e0
│  │  ├─ c4
│  │  │  ├─ ab7f19d1f738bb08379297ac62f391ce298932
│  │  │  └─ bc0765a286a3c05322b6f725082f036d23edeb
│  │  ├─ c5
│  │  │  └─ 7ce814385eb7de2fb1882c6739650fc0f83d1b
│  │  ├─ c8
│  │  │  ├─ 91931058c55a1925ebfd3edde1ff9c3b876fd3
│  │  │  └─ f01ca2b58260d5452d77b840664a3a9ae3689e
│  │  ├─ ca
│  │  │  └─ f4edd550a256c16480d48abeea94dfea5638da
│  │  ├─ cc
│  │  │  └─ 8861a866ca4db6d7fdb6ae3cf809473969c203
│  │  ├─ ce
│  │  │  ├─ a843630f0ee93c83ccab2babfe20f93fce1cc3
│  │  │  └─ be3c19111306c19936e90df90e307fd64793f4
│  │  ├─ cf
│  │  │  └─ 2565a3beb2ad4af83d68aee9d248ab4a9fccdb
│  │  ├─ d1
│  │  │  ├─ 4f78cc5e0f001569a8a746bc59d17cc96064a0
│  │  │  └─ 604fe7932f4491375e00cdbbe30172963dec01
│  │  ├─ d4
│  │  │  └─ 0784d7930c962f578afe02e3165579032d08ef
│  │  ├─ d5
│  │  │  └─ 128ff39bddbcdb4c79f22da375d693fd86d5dd
│  │  ├─ d6
│  │  │  └─ a75d9a3aa455c0a5b2d40f9c0945a97f43aecd
│  │  ├─ d7
│  │  │  └─ 261275f65d685baeb6b7588e8e252d13c8c69e
│  │  ├─ d8
│  │  │  ├─ 63a341d967a6411759f81c8c5871638a4830af
│  │  │  └─ d3ecec0c5e10c9148053140566c581b34b9e51
│  │  ├─ da
│  │  │  └─ f1eb84413ffd6e6e5516a5009a4c8c93dee64f
│  │  ├─ db
│  │  │  ├─ 009d15d57fa63cf5f598f6506853b0303ead78
│  │  │  └─ 7773bd947f9c9c0b295c7d56082c49dcf20b36
│  │  ├─ dd
│  │  │  └─ c4f34e37a9ce66476da8f57d3e97fdc4ec7136
│  │  ├─ df
│  │  │  └─ 60c4b266e639e09dc38a6fdc179f4bd5872e53
│  │  ├─ e0
│  │  │  └─ 97b0cadad22fa2ae913b9e0769f87b0a82a2eb
│  │  ├─ e1
│  │  │  ├─ 7803e8a14e916dc7b17554741beb8098b47a96
│  │  │  └─ 7920477052feecdf8f3fc82cfae1b13b656705
│  │  ├─ e4
│  │  │  └─ c8fd0f3b3976075da8272a14a200e88f153b3e
│  │  ├─ e5
│  │  │  └─ 8d37b93191d01bfdcc0530dab3743e336601b2
│  │  ├─ e6
│  │  │  ├─ 9de29bb2d1d6434b8b29ae775ad8c2e48c5391
│  │  │  └─ e32dbd69a8dd7f046cc36b01bb321277104078
│  │  ├─ e7
│  │  │  ├─ ae9ff50b1a9f3ea0ca9f43551769adee5e62e7
│  │  │  └─ c769eb0be45a76909e5bbee8aab63af11bcbdd
│  │  ├─ e8
│  │  │  ├─ abb40b7c33119fd26caa46be54225353d6f865
│  │  │  ├─ b13d90b4190f9b66ffd9de7f111a97f733c8c2
│  │  │  ├─ b7be23f403cd19b1b4d0e88d0cb53de2d3dc87
│  │  │  └─ cfaaf80c404eb97d3cf8b6277ec15f37e6905e
│  │  ├─ e9
│  │  │  └─ bde6aba3c36dbf1879f62110522c9bd4678329
│  │  ├─ ea
│  │  │  └─ 84e52ed9b90a4a49ee79b8874d4dc94cc6a5e4
│  │  ├─ ec
│  │  │  ├─ 2a033b9c2475be69eadf8ede6abc3d9856cdc2
│  │  │  └─ 40fb12580f67920962c6f7ddd192700c109e96
│  │  ├─ ef
│  │  │  └─ eac8db5cb542ecf8d5785b892783bf32a885ae
│  │  ├─ f0
│  │  │  └─ d34f63031cf904fc1472eb3f99e8d42d9e6b00
│  │  ├─ f4
│  │  │  └─ 275c36e599659b88be2706b21f81b98753a8c5
│  │  ├─ f6
│  │  │  ├─ 5484edc05f868085e7a7433bbd66a19be79516
│  │  │  └─ 6d032097f6775b66de3ece90413412c0d9102b
│  │  ├─ f9
│  │  │  └─ 2e8f074f59bf894841d22d878bd3595a587d77
│  │  ├─ fb
│  │  │  ├─ 2d56069403fc05797eb724fc15fb8c6ec39814
│  │  │  └─ 6a15034ba2ef084bbba8bc35f01f974e9988d7
│  │  ├─ fc
│  │  │  └─ b985ad8b1b6ebff2c0ea4f28737c640062998a
│  │  ├─ ff
│  │  │  ├─ 61454162cb4f51d13d5691a75f18dc946c7f37
│  │  │  ├─ 93f7cf4ee5a586ed6b5ff8f0f14bd941a221a7
│  │  │  └─ de3de97fc3c09e0957cf84195d41b1cb8c3c8c
│  │  ├─ info
│  │  └─ pack
│  └─ refs
│     ├─ heads
│     │  └─ master
│     ├─ remotes
│     │  └─ origin
│     │     └─ master
│     └─ tags
├─ .gitignore
├─ cloudfunctions
│  ├─ actionAct
│  │  ├─ config.json
│  │  ├─ index.js
│  │  └─ package.json
│  ├─ callback
│  │  ├─ config.json
│  │  ├─ index.js
│  │  └─ package.json
│  ├─ cloud
│  ├─ login
│  │  ├─ config.json
│  │  ├─ index.js
│  │  ├─ package-lock.json
│  │  └─ package.json
│  ├─ openapi
│  │  ├─ config.json
│  │  ├─ index.js
│  │  └─ package.json
│  ├─ register
│  ├─ user-login-register
│  │  ├─ index.js
│  │  ├─ package-lock.json
│  │  ├─ package.json
│  │  └─ WXBizDataCrypt.js
│  ├─ user-session
│  │  ├─ config
│  │  │  └─ example.js
│  │  ├─ index.js
│  │  ├─ package-lock.json
│  │  └─ package.json
│  ├─ wx-ext-cms-api
│  ├─ wx-ext-cms-fx-openapi
│  ├─ wx-ext-cms-init
│  ├─ wx-ext-cms-openapi
│  ├─ wx-ext-cms-service
│  └─ wx-ext-cms-sms
├─ miniprogram
│  ├─ app.js
│  ├─ app.json
│  ├─ app.wxss
│  ├─ behaviors
│  │  └─ muiBase.js
│  ├─ components
│  │  └─ chatroom
│  │     ├─ chatroom.js
│  │     ├─ chatroom.json
│  │     ├─ chatroom.wxml
│  │     ├─ chatroom.wxss
│  │     ├─ dots.gif
│  │     └─ photo.png
│  ├─ iconfont
│  │  └─ iconfont.wxss
│  ├─ images
│  │  ├─ about.png
│  │  ├─ active_people.png
│  │  ├─ active_windmill.png
│  │  ├─ active_world.png
│  │  ├─ attend.png
│  │  ├─ gift.png
│  │  ├─ man.png
│  │  ├─ people.png
│  │  ├─ publish.png
│  │  ├─ service.png
│  │  ├─ star.png
│  │  ├─ unman.png
│  │  ├─ user-unlogin.png
│  │  ├─ windmill.png
│  │  ├─ woman.png
│  │  └─ world.png
│  ├─ model
│  │  └─ addArticle
│  ├─ package.json
│  ├─ pages
│  │  ├─ index
│  │  │  ├─ index.js
│  │  │  ├─ index.json
│  │  │  ├─ index.wxml
│  │  │  └─ index.wxss
│  │  ├─ showAct
│  │  │  ├─ joinUser
│  │  │  │  ├─ joinUser.js
│  │  │  │  ├─ joinUser.json
│  │  │  │  ├─ joinUser.skeleton.wxml
│  │  │  │  ├─ joinUser.skeleton.wxss
│  │  │  │  ├─ joinUser.wxml
│  │  │  │  ├─ joinUser.wxss
│  │  │  │  └─ user.wxs
│  │  │  ├─ showAct.js
│  │  │  ├─ showAct.json
│  │  │  ├─ showAct.skeleton.wxml
│  │  │  ├─ showAct.skeleton.wxss
│  │  │  ├─ showAct.wxml
│  │  │  └─ showAct.wxss
│  │  ├─ start
│  │  │  ├─ start.js
│  │  │  ├─ start.json
│  │  │  ├─ start.wxml
│  │  │  └─ start.wxss
│  │  ├─ startForm
│  │  │  ├─ editor
│  │  │  │  ├─ index.js
│  │  │  │  ├─ index.json
│  │  │  │  ├─ index.wxml
│  │  │  │  └─ index.wxss
│  │  │  ├─ startForm.js
│  │  │  ├─ startForm.json
│  │  │  ├─ startForm.wxml
│  │  │  ├─ startForm.wxs
│  │  │  └─ startForm.wxss
│  │  └─ user
│  │     ├─ about
│  │     │  ├─ about.js
│  │     │  ├─ about.json
│  │     │  ├─ about.wxml
│  │     │  └─ about.wxss
│  │     ├─ record
│  │     │  ├─ record.js
│  │     │  ├─ record.json
│  │     │  ├─ record.wxml
│  │     │  └─ record.wxss
│  │     ├─ reward
│  │     │  ├─ reward.js
│  │     │  ├─ reward.json
│  │     │  ├─ reward.wxml
│  │     │  └─ reward.wxss
│  │     ├─ user.js
│  │     ├─ user.json
│  │     ├─ user.wxml
│  │     ├─ user.wxs
│  │     └─ user.wxss
│  ├─ sitemap.json
│  ├─ store
│  │  └─ userinfo.js
│  ├─ style
│  │  └─ guide.wxss
│  ├─ utils
│  │  ├─ base64.js
│  │  ├─ getLogin.js
│  │  └─ utils.js
│  └─ yarn.lock
├─ project.config.json
├─ project.private.config.json
└─ README.md

```