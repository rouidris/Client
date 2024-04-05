import React from 'react';
import image1 from "../../assets/field.jpg";
import mapandman from "../../assets/scale_1200.png"
import image3 from "../../assets/fieldthree.jpg"
import image2 from "../../assets/4_695x464_242_waifu2x_art_noise1_scale.png"
import image32 from "../../assets/image 32.jpg"
import image33 from "../../assets/image 33.png"

const MainPost = () => {
    return (
        <div>
            <div className="max-w-full flex flex-col items-center">
                <div className="relative">
                    <img src={mapandman} alt="MapAndMan" style={{ width: '1560px' }} />
                    <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-6xl opacity-80">
                        Земельное агентство TerraTrade
                    </p>
                </div>
            </div>

            <div className='max-w-[1300px] mx-auto py-10'>

                <div className='flex flex-col justify-center  rounded-2xl' style={{backgroundColor: "  black "}}>
                    <p className='flex justify-center mx-auto text-white font-bold text-xl m-10 w-auto uppercase' >
                        Земельное агентство лучший помощник для управление вашими полями
                    </p>
                    <div className='text-center bg-amber-50 p-5 text-white' style={{backgroundColor: "  #25885d "}}>
                        <h1 className="py-4 px-36">
                            Предлагаем возможность зарегистрированным пользователям хранить информацию о своих земельных участках,
                            включая координаты и площадь. Это может быть полезным для владельцев недвижимости, агентств недвижимости и инвесторов.
                        </h1>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2 mb-2">
                        <img src={image1} alt="dron" />
                        <img src={image2} alt="image2" />
                        <img src={image3} alt="image3" />
                        {/* Добавьте больше изображений по аналогии */}
                    </div>

                    <div className=' bg-amber-50 p-5 text-black' style={{backgroundColor: "  #white "}}>
                            <h1 className="py-4 px-16 font-bold text-xl">
                                GPS относится к наземной технологии, позволяющей производителям собирать данные с точной информацией о местоположении в режиме реального времени. GPS подходит для следующих задач:
                            </h1>
                            <h2 className="px-16 font-medium"> ~ картографирование ирригационных систем, полей и дорог</h2>
                            <h2 className="px-16 font-medium"> ~ выявление участков с проблемными растениями</h2>
                            <h2 className="px-16 font-medium"> ~ тестирование почвы на конкретных участках поля</h2>
                            <h2 className="px-16 font-medium"> ~ движение БПЛА с параллельным рулевым управлением</h2>
                            <h2 className="px-16 font-medium"> ~ RA для точного внесения семян и удобрений</h2>

                </div>

                    <img src={image33} alt="image33" />


                </div>

                <div>
                    <div className='text-center bg-amber-50 p-5 text-white font-bold text-xl mt-16' style={{backgroundColor: "  black "}}>
                        <h1 >
                            Точное земледелие: технология для развития продовольства
                        </h1>
                    </div>
                    <div className=' bg-amber-50 p-5 text-black' style={{backgroundColor: "  white "}}>
                        <h2 className="py-4 px-16 text-lg font-extrabold">Что такое точное земледелие?</h2>
                        <h1 className="py-4 px-16">
                            В точном земледелии используются современные технологии, такие как спутниковые снимки или картографирование полей, для повышения качества урожая и прибыльности. Кроме того, он оптимизирует использование традиционных ресурсов. Поэтому данная система управления сельским хозяйством способствует развитию устойчивого сельского хозяйства , позволяя решать как экономические, так и экологические проблемы, которые становятся все более острыми.
                        </h1>
                        <h1 className="py-1 px-16">
                            Среди технологий, используемых в такой системе, — GPS, дроны и спутниковые снимки. На основе этих данных аграрии получают информацию по всем ключевым вопросам: состояние урожая, прогнозы погоды, изменения окружающей среды и т. д. Также важным отличием точного земледелия от традиционного земледелия является возможность управления полями не единым блоком, а путем их разделения. на отдельные области. Такое зонирование позволяет диверсифицировать управленческие решения по отдельным участкам поля: регулировать количество удобрений, оптимизировать движение техники, более экономно расходовать топливо.
                        </h1>
                    </div>
                </div>
                <div>
                    <div className='text-center bg-amber-50 p-5 text-white mt-8 rounded-2xl mb-8' style={{backgroundColor: "  #00AD9F "}}>
                        <h1 className="py-4 px-36 ">
                            Системы точного земледелия представляют собой динамично развивающиеся системы управления.
                            Они позволяют фермерам решать целый спектр задач. В то же время точное земледелие включает в
                            себя широкий спектр инструментов, которые необходимо освоить производителям, чтобы получить
                            максимальную отдачу от своего производства.
                        </h1>
                    </div>
                    <img src={image32} alt="dron" />
                </div>

            </div>
        </div>
    );
};

export default MainPost;