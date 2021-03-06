<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Janusz;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller
{
    /**
     * @Route("/{year}", name="homepage", requirements={"year"="\d+"})
     */
    public function indexAction(Request $request, $year = null)
    {
        $em = $this->getDoctrine()->getManager();
        $pearsonRepository = $em->getRepository('AppBundle:Pearson');
        $pearsons = $pearsonRepository->findAll();

        if(!is_numeric($year)){
            $year = date('Y');
        }
        $dateStart = $year . '-01-01';
        $dateEnd = $year . '-12-31';
        $januszes = $em->createQuery("select j from AppBundle\Entity\Janusz j where j.date >= '$dateStart' AND j.date <= '$dateEnd'")->getResult();
        $ret = [];

        foreach ($pearsons as $pkey => $pearson) {
            $ret[$pkey]['id'] = $pearson->getId();
            $ret[$pkey]['name'] = $pearson->getName();
            $ret[$pkey]['surname'] = $pearson->getSurname();
            $ret[$pkey]['unit'] = $pearson->getUnit();
            $ret[$pkey]['janusze']['count'] = 0;
            foreach ($januszes as $janusz) {
                if ($janusz->getPearson() == $pearson) {
                    $ret[$pkey]['janusze']['count']++;
                    $ret[$pkey]['janusze']['items'][] = ['reason' => $janusz->getReason(), 'date' => $janusz->getDate()->format('Y-m-d H:i:s')];
                }
            }
        }

        // replace this example code with whatever you need
        return $this->render('AppBundle:common:index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir') . '/..') . DIRECTORY_SEPARATOR,
            'januszesList' => $ret
        ]);
    }

    /**
     * @Route("/getpearsons/{year}", name="getpearsons", requirements={"year"="\d+"})
     */
    public function getPearsonsWithJanuszesAction(Request $request, $year = null)
    {
        $em = $this->getDoctrine()->getManager();

        $pearsonRepository = $em->getRepository('AppBundle:Pearson');
        $pearsons = $pearsonRepository->findAll();

        if(!is_numeric($year)){
            $year = date('Y');
        }
        $dateStart = $year . '-01-01';
        $dateEnd = $year . '-12-31';
        $januszes = $em->createQuery("select j from AppBundle\Entity\Janusz j where j.date >= '$dateStart' AND j.date <= '$dateEnd'")->getResult();

        $ret = [];
        foreach ($pearsons as $pkey => $pearson) {
            $ret[$pkey]['id'] = $pearson->getId();
            $ret[$pkey]['name'] = $pearson->getName();
            $ret[$pkey]['surname'] = $pearson->getSurname();
            $ret[$pkey]['full_name'] = $pearson->getName() .' '. $pearson->getSurname();
            $ret[$pkey]['unit'] = $pearson->getUnit();
            $ret[$pkey]['janusze']['count'] = 0;
            foreach ($januszes as $janusz) {
                if ($janusz->getPearson() == $pearson) {
                    $ret[$pkey]['janusze']['count']++;
                    $ret[$pkey]['janusze']['items'][] = ['reason' => $janusz->getReason(), 'date' => $janusz->getDate()->format('Y-m-d')];
                }
            }
        }

        return new JsonResponse($ret);
    }

    /**
     * @Route("/addjanusz", name="addjanusz")
     */
    public function addJanuszAction(Request $request)
    {
        $r = json_decode($request->getContent(), true);
        if (null != $r['janusz_opis'] && null != $r['janusz_pearson']) {
            $em = $this->getDoctrine()->getManager();
            $pearsonRepository = $em->getRepository('AppBundle:Pearson');
            $Pearson = $pearsonRepository->findOneById($r['janusz_pearson']);
            $Janusz = new Janusz();
            $Janusz->setReason($r['janusz_opis']);
            $Janusz->setPearson($Pearson);
            $Janusz->setDate(new \DateTime());
            $em->persist($Janusz);
            $em->flush();
            return new JsonResponse('Janusz został dodany dla <b>' . $Pearson->getName() . ' ' . $Pearson->getSurname(). '</b>');
        } else{
            return new JsonResponse('error, empty janusz or pearson');
        }
    }

    /**
     * @Route("/addpearson", name="addpearson")
     */
    public function addPearsonAction(Request $request)
    {

    }
}
