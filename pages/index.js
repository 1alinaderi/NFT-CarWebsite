import Head from "next/head";
import { Inter } from "next/font/google";
import Link from "next/link";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ScrollTrigger from "react-scroll-trigger";
import { useEffect, useState } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Web3 from "web3";
import { useWeb3Modal, Web3Button } from "@web3modal/react";
import { MdSwapVert } from "react-icons/md";
import { bsc } from "wagmi/chains";
import { AbiRouterContract, AbiToken } from "@/abi/abi";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  const { ethereumClient } = props;
  const [isapproved, setisapproved] = useState(false);
  const [walletAddress, setWalletAddress] = useState();
  const [price, setPrice] = useState();
  const [pricemigmig, setPricemigmig] = useState();
  const [animated, setAnimated] = useState(false);
  const [animated2, setAnimated2] = useState(false);
  const [migmigeinput, setmigmigeinput] = useState();
  const [animatedimg, setAnimatedimg] = useState(false);
  const [animatedimg2, setAnimatedimg2] = useState(false);
  const [BNBTOAIPEPE, setBNBTOAIPEPE] = useState(true);
  const [BNBinput, setBNBinput] = useState();
  const { setDefaultChain } = useWeb3Modal();
  const web3 = new Web3(Web3.givenProvider);

  const onEnterViewport = () => {
    setAnimated(true);
  };
  const onEnterViewport2 = () => {
    setAnimated2(true);
  };

  const onExitViewport = () => {
    setAnimated(false);
  };
  const onExitViewport2 = () => {
    setAnimated(false);
  };
  const onEnterimg = () => {
    setAnimatedimg(true);
  };
  const onEnterimg2 = () => {
    setAnimatedimg2(true);
  };

  const onExitimg = () => {
    setAnimatedimg(false);
  };
  const onExitimg2 = () => {
    setAnimatedimg2(false);
  };

  // web3
  const migmigAddress = "0xf2b9b91EcF8F34f9012dddcD874696424C0921B4";
  const RouterAddress = "0x10ed43c718714eb63d5aa57b78b54704e256024e";
  const WBNBAddress = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";
  const Aipepecontract = new web3.eth.Contract(AbiToken, migmigAddress);
  const Routercontract = new web3.eth.Contract(
    AbiRouterContract,
    RouterAddress
  );

  useEffect(() => {
    setWalletAddress(ethereumClient?.getAccount()?.address);

    setDefaultChain(bsc);
    
  }, [ethereumClient?.getAccount()?.address]);
  console.log(ethereumClient)
  useEffect(
    (e) => {
      async function setapprov() {
        if (walletAddress) {
          const currentAllowance = await Aipepecontract?.methods
            ?.allowance(walletAddress, RouterAddress)
            ?.call();
          if (currentAllowance < migmigeinput * 1000000000) {
            setisapproved(true);
          }
        }
      }
      setapprov();
    },
    [migmigeinput]
  );
  useEffect(() => {
    const sellAmount = 10 ** 18; // 100 DAI = 10^20 wei
    const sellAmountaipepe = 10 ** 15; // 100 DAI = 10^20 wei
    async function giveInformation() {
      const response = await fetch(
        `https://bsc.api.0x.org/swap/v1/quote?buyToken=${migmigAddress}&sellToken=${WBNBAddress}&sellAmount=${sellAmount}&excludedSources=LiquidityProvider`
      );
      const quote = await response.json();
      setPrice(quote.price);
    }
    async function giveInformationaipepe() {
      const response = await fetch(
        `https://bsc.api.0x.org/swap/v1/quote?buyToken=${WBNBAddress}&sellToken=${migmigAddress}&sellAmount=${sellAmountaipepe}&excludedSources=LiquidityProvider`
      );
      const quote = await response.json();
      setPricemigmig((quote.buyAmount * 0.000000000000000001).toFixed(18));
    }
    giveInformation();
    giveInformationaipepe();
  }, []);
  async function _BNBtoAipepe() {
    // Perform the swap.
    const gasPrice = await web3.eth.getGasPrice();
    const gas = await Routercontract?.methods
      ?.swapExactETHForTokens(
        (
          (BNBinput * price - (BNBinput * price) / 100) *
          1000000000
        ).toLocaleString(undefined, { useGrouping: false }),
        [WBNBAddress, migmigAddress],
        walletAddress,
        Math.floor(Date.now() / 1000) + 60 * 10
      )
      .estimateGas({
        from: walletAddress,
        value: (BNBinput * 1000000000000000000).toFixed(),
        gasPrice: gasPrice,
        chainId: 56,
      })
      .then((e) => {
        toast.success(e.message);
      })
      .catch((e) => {});

    await Routercontract?.methods
      ?.swapExactETHForTokens(
        (
          (BNBinput * price - (BNBinput * price) / 100) *
          1000000000
        ).toLocaleString(undefined, { useGrouping: false }),
        [WBNBAddress, migmigAddress],
        walletAddress,
        Math.floor(Date.now() / 1000) + 60 * 10
      )
      .send({
        from: walletAddress,
        gas: gas ? gas : 0,
        value: (BNBinput * 1000000000000000000).toFixed(),
        gasPrice: gasPrice,
        chainId: 56,
      })
      .then((e) => {
        toast.success(e.message);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  }

  async function _AipepeToBNB() {
    // Perform the swap.
    const currentAllowance = await Aipepecontract?.methods
      ?.allowance(walletAddress, RouterAddress)
      ?.call();
    if (currentAllowance < migmigeinput * 1000000000) {
      const newAllowance = new web3.utils.BN("2")
        ?.pow(new web3.utils.BN("256"))
        ?.sub(new web3.utils.BN("1"));
      const gasAprrroved = await Aipepecontract.methods
        ?.approve(RouterAddress, newAllowance)
        ?.estimateGas({ from: walletAddress });
      await Aipepecontract.methods
        ?.approve(RouterAddress, newAllowance)
        ?.send({ from: walletAddress, gas: gasAprrroved })
        ?.then((e) => {
          setisapproved(true);
          toast.success("Approved success");
        })
        .catch((e) => {
          toast.error(e.message);
        });
    }
    const gasPrice = await web3?.eth?.getGasPrice();
    const gas = await Routercontract?.methods
      ?.swapExactTokensForETH(
        (migmigeinput * 1000000000).toFixed(),
        (
          ((migmigeinput * pricemigmig) / 1000000 -
            (migmigeinput * pricemigmig) / 1000000 / 100) *
          1000000000000000000
        )
          .toFixed()
          .toLocaleString(undefined, { useGrouping: false }),
        [migmigAddress, WBNBAddress],
        walletAddress,
        Math.floor(Date.now() / 1000) + 60 * 5
      )
      ?.estimateGas({
        from: walletAddress,
      });
    if (isapproved) {
      await Routercontract?.methods
        ?.swapExactTokensForETH(
          (migmigeinput * 1000000000).toFixed(),
          (
            ((migmigeinput * pricemigmig) / 1000000 -
              (migmigeinput * pricemigmig) / 1000000 / 100) *
            1000000000000000000
          )
            .toFixed()
            .toLocaleString(undefined, { useGrouping: false }),
          [migmigAddress, WBNBAddress],
          walletAddress,
          Math.floor(Date.now() / 1000) + 60 * 5
        )
        ?.send({
          from: walletAddress,
          gas: gas,
          gasPrice: gasPrice,
          chainId: 56,
        })
        ?.then((e) => {
          toast.success(e.message);
        })
        ?.catch((e) => {
          toast.error(e.message);
        });
    }
  }
  return (
    <>
      <Head>
        <title>Tesla Cars</title>
        <meta name="description" content="Generated by Tesla Cars" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div
        style={{ position: "relative", overflow: "hidden" }}
        className={`${inter.className}`}
      >
        <img className="bg_position" src="/1.png" />
        <img className="bg_position_2" src="/1.png" />
        <header className="w-100 header_bg d-flex justify-content-center align-items-center">
          <img className="p-2" src="/logo.png" />
          <span className="me-4">Tesla Cars</span>
          <Link href={"https://teslacars.tech/"}>
            <div className="button_home px-4 py-2">Home</div>
          </Link>
        </header>
        <main className="w-100 overflow-hidden p-0 m-0 d-flex justify-content-center flex-wrap">
          <div className="w-100 p-0 m-0 d-flex py-0">
            <ScrollTrigger onEnter={onEnterViewport} onExit={onExitViewport}>
              <img
                src="/carve.png"
                className={`animation_go ${animated && " animate"}`}
              />
            </ScrollTrigger>
          </div>
          <div className="col-lg-7 col-md-9 col-11 p-0 m-0 d-flex justify-content-center flex-wrap">
            <Swiper
              slidesPerView={1}
              navigation
              modules={[Navigation, Autoplay]}
              loop
              autoplay={{
                delay: 3000,
              }}
            >
              <SwiperSlide>
                <img src="/slider2.webp" className="w-100 px-4 px-sm-2" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/slider3.webp" className="w-100 px-4 px-sm-2" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/slider (3).png" className="w-100 px-4 px-sm-2" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/slider (4).png" className="w-100 px-4 px-sm-2" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/slider (5).png" className="w-100 px-4 px-sm-2" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/slider4.webp" className="w-100 px-4 px-sm-2" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/slider.webp" className="w-100 px-4 px-sm-2" />
              </SwiperSlide>
            </Swiper>
            {/* <div className='text_sldier mt-5 text-center '>
             <h3>
               Tesla Cars
             </h3>
             It seems like one of the “It” colors on the runways of this upcoming year may be this orange shade. So, we’re back with another grayscale palette that includes a bright pop of color, that color being hot orange. This website design shows that bright colors can still come across as luxurious and high-end when used correctly. 
          </div> */}
          </div>
          <div className="w-100 p-0 m-0 d-flex py-0 justify-content-end py-2">
            <ScrollTrigger onEnter={onEnterimg} onExit={onExitimg}>
              <img
                src="/carve2.png"
                className={`animation_go_2 ${animatedimg && " animate_2"}`}
              />
            </ScrollTrigger>
          </div>
          <div className="w-100 d-flex justify-content-center py-4">
            <div className="p-2 d-flex p-4 pt-3 flex-wrap align-items-center justify-content-start col-lg-4 mb-3 col-md-8 col-sm-9 col-11 bg_link_input">
              {/* <h3 className='w-100 text-center'>BUY NOW</h3> */}
              <div className="w-100 d-flex py-3 pb-4  justify-content-center">
                <Web3Button />
              </div>
              {BNBTOAIPEPE ? (
                <div className="form-group col-md-12 col-12 d-flex  justify-content-start align-items-center">
                  <span className="icon_Token">
                    <img src="/BNB.png" />
                  </span>
                  <input
                    placeholder="0.00"
                    value={BNBinput}
                    onChange={(e) => setBNBinput(e.target.value)}
                    className="form-field w-100 "
                  />
                </div>
              ) : (
                <div className="form-group col-md-12 col-12 d-flex  justify-content-start align-items-center">
                  <span className="icon_Token">
                    <img src="/logo.png" />
                  </span>

                  <input
                    placeholder="0.00"
                    value={migmigeinput}
                    onChange={(e) => setmigmigeinput(e.target.value)}
                    type="number"
                    className=" w-100 form-field"
                  />
                </div>
              )}

              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  walletAddress
                    ? BNBTOAIPEPE
                      ? setBNBTOAIPEPE(false)
                      : setBNBTOAIPEPE(true)
                    : toast.warning("connect to wallet");
                }}
                className="col-12 d-flex flex-column justify-content-center align-items-center"
              >
                <MdSwapVert color="#16123f" size={45} />
              </div>
              {BNBTOAIPEPE ? (
                <div className="form-group col-md-12 col-12 d-flex  justify-content-start align-items-center">
                  <span className="icon_Token">
                    <img src="/logo.png" />
                  </span>

                  <input
                    placeholder="0.00"
                    value={BNBinput ? (BNBinput * price).toFixed(9) : ""}
                    disabled
                    type="text"
                    className="form-field w-100 "
                  />
                </div>
              ) : (
                <div className="form-group col-md-12 col-12 d-flex  justify-content-start align-items-center">
                  <span className="icon_Token">
                    <img src="/BNB.png" />
                  </span>
                  <input
                    placeholder="0.00"
                    value={
                      migmigeinput
                        ? ((migmigeinput * pricemigmig) / 1000000).toFixed(18)
                        : ""
                    }
                    disabled
                    type="text"
                    className="form-field w-100 "
                  />
                </div>
              )}
              <div className="w-100 d-flex justify-content-center">
                {BNBTOAIPEPE ? (
                  <button
                    onClick={(e) => {
                      _BNBtoAipepe();
                    }}
                    className="button_home py-2  px-5 mt-4"
                  >
                    SWAP
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      _AipepeToBNB();
                    }}
                    className="button_home py-2  px-5 mt-4"
                  >
                    {isapproved ? "SWAP" : "APPROVE"}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="w-100">
            <div className="w-100 d-flex justify-content-start">
              <ScrollTrigger
                onEnter={onEnterViewport2}
                onExit={onExitViewport2}
              >
                <img
                  src="/carve.png"
                  className={`animation_go my-1 ${animated2 && " animate"}`}
                />
              </ScrollTrigger>
            </div>
            <div className="w-100 d-flex justify-content-end">
              <ScrollTrigger onEnter={onEnterimg2} onExit={onExitimg2}>
                <img
                  src="/carve2.png"
                  className={`animation_go_2 my-1 ${
                    animatedimg2 && " animate_2"
                  }`}
                />
              </ScrollTrigger>
            </div>
          </div>

          <div className="col-lg-7 col-11 col-md-8 py-3 pb-5">
            <h3 className="text-center">Staking</h3>
            <div className="w-100 p-3 px-4 bg_link_input farm_text">
              <div className="w-100 d-flex flex-wrap justify-content-between py-2 ">
                <span className="col-12 d-flex p-0 m-0 align-items-center">
                  <img src="/BNB.png" className="img_farm p-0 m-0" />
                  <img
                    style={{ position: "relative", left: "-1%" }}
                    src="/logo.png"
                    className="img_farm p-0 m-0"
                  />
                  <b>BNB - TECAR</b>
                </span>
                <span className="col-4 col-lg-3 p-0 pt-3 m-0">
                  Earned <br />
                  <b>0</b>
                </span>
                <span className="col-4 col-lg-3 p-0 pt-3 m-0">
                  APR <br /> <b>800%</b>
                </span>
                <span className="col-4 col-lg-3 pt-3 p-0 m-0">
                  Liquidity
                  <br />
                  <b>$000,000,000</b>
                </span>
                <span className="d-none d-lg-block col-lg-3 pt-3 p-0 m-0">
                  Multiplier
                  <br />
                  <b>40X</b>
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
